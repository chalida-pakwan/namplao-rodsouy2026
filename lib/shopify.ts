import { Car } from '@/data/cars';

const domain = process.env.SHOPIFY_DOMAIN || 'kn-goodcar.com'; // SHOPIFY_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN || 'bb70cb008199a94b83c98df0e45ada67'; // SHOPIFY_STOREFRONT_TOKEN
const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01'; // SHOPIFY_API_VERSION

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: object;
}): Promise<T | undefined> {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 0 }, // Disable caching for now so updates are instant
    });

    const json = await response.json();

    if (json.errors) {
      console.error('Shopify API errors:', json.errors);
      return undefined;
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return undefined;
  }
}

// Helper to map a Shopify node to our Car interface
function mapShopifyProductToCar(node: any): Car {
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  
  // Attempt to parse Year from title
  const titleYearMatch = node.title.match(/\b(19|20)\d{2}\b/);
  
  // Mapping images
  const gallery = node.images.edges.map((edge: any) => edge.node.url);
  const heroImage = gallery[0] || '';

  // Features from tags
  const features = node.tags;

  const getMeta = (key: string) => {
      const field = node.metafields?.find((m: any) => m && m.key === key);
      let val = field ? field.value : null;
      if (val && typeof val === 'string' && val.startsWith('[')) {
          try {
              const parsed = JSON.parse(val);
              if (Array.isArray(parsed) && parsed.length > 0) {
                  val = parsed[0];
              }
          } catch(e) {}
      }
      return val;
  };
  
  // Defaulting to 0 mileage if not found
  const mileageStr = getMeta('mileage');
  const mileage = mileageStr ? parseInt(String(mileageStr).replace(/,/g, '')) : 0;
  
  // Transmission from strict backend object only
  const transVal = String(getMeta('transmission') || '').trim();
  let transmission = ''; 
  if (transVal.includes('ธรรมดา') || transVal.toUpperCase() === 'MT' || transVal.toUpperCase() === 'MANUAL') {
      transmission = 'MT';
  } else if (transVal.includes('ออโต้') || transVal.includes('อัตโนมัติ') || transVal.toUpperCase() === 'AT' || transVal.toUpperCase() === 'AUTO') {
      transmission = 'AT';
  }

  // Fuel from strict backend object only
  let fuelVal = String(getMeta('fuel') || getMeta('fuel_type') || '').trim();
  let fuel = '';
  if (fuelVal) {
     if (fuelVal.includes('ดีเซล') || fuelVal.toLowerCase() === 'diesel') fuel = 'Diesel';
     else if (fuelVal.includes('เบนซิน') || fuelVal.includes('เบนซิล') || fuelVal.toLowerCase() === 'benzine') fuel = 'Benzine';
     else if (fuelVal.includes('ไฮบริด') || fuelVal.toLowerCase() === 'hybrid') fuel = 'Hybrid';
     else if (fuelVal.includes('ไฟฟ้า') || fuelVal.toLowerCase() === 'ev') fuel = 'EV';
     else fuel = fuelVal;
  }

  // Drivetrain
  let drivetrain = '2WD';
  const drVal = getMeta('drive_system');
  if (drVal && (drVal.includes('4WD') || drVal.includes('AWD') || drVal.includes('ขับเคลื่อน 4 ล้อ'))) drivetrain = '4WD';

  // Model and Year
  const yearStr = getMeta('year');
  const year = yearStr ? parseInt(yearStr) : (titleYearMatch ? parseInt(titleYearMatch[0]) : new Date().getFullYear());
  const model = getMeta('car_type') || node.productType || node.title;

  return {
    id: node.id,
    slug: node.handle,
    title: node.title,
    brand: node.vendor || 'Unknown',
    model: model,
    year: year,
    regYear: year, // Defaulting regYear to year
    price: price,
    mileageKm: mileage, // Not available in standard fields, defaulting
    transmission: transmission, // Defaulting, ideally from metaobject/tags
    fuel: fuel, // Defaulting
    drivetrain: drivetrain,
    location: 'เชียงใหม่', // Default
    heroImage: heroImage,
    gallery: gallery, // Will now contain as many as fetched
    features: features,
    description: node.descriptionHtml.replace(/<[^>]*>?/gm, ''), // Strip HTML
    sold: !node.availableForSale || node.tags.includes('Reserved') || node.tags.includes('จองแล้ว'),
  } as unknown as Car;
}


function safeDecodeHandle(handle: string) {
  try {
    return decodeURIComponent(handle);
  } catch {
    return handle;
  }
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  const handle = safeDecodeHandle(slug);
  const query = `
    query GetCarBySlug($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        vendor
        productType
        descriptionHtml
        tags
        availableForSale
        metafields(identifiers: [
          {namespace: "custom", key: "year"},
          {namespace: "custom", key: "mileage"},
          {namespace: "custom", key: "transmission"},
          {namespace: "custom", key: "fuel_type"},
          {namespace: "custom", key: "fuel"},
          {namespace: "custom", key: "drive_system"},
          {namespace: "custom", key: "color"},
          {namespace: "custom", key: "car_type"}
        ]) {
          key
          value
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 250) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    product: any
  }>({ 
    query,
    variables: { handle }
  });

  if (!data?.product) return null;
  return mapShopifyProductToCar(data.product);
}

export async function getCars() {
  const query = `
    query GetCars {
      products(first: 250, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            vendor
            productType
            descriptionHtml
            tags
            availableForSale
            metafields(identifiers: [
              {namespace: "custom", key: "year"},
              {namespace: "custom", key: "mileage"},
              {namespace: "custom", key: "transmission"},
              {namespace: "custom", key: "fuel_type"},
              {namespace: "custom", key: "fuel"},
              {namespace: "custom", key: "drive_system"},
              {namespace: "custom", key: "color"},
              {namespace: "custom", key: "car_type"}
            ]) {
              key
              value
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  // Use a cache-busting timestamp to force fresh data
  const data = await shopifyFetch<{
    products: {
      edges: Array<{
        node: any
      }>
    }
  }>({ 
    query,
    variables: { t: Date.now() } 
  });

  return data?.products.edges.map(({ node }) => mapShopifyProductToCar(node)) || [];
}
