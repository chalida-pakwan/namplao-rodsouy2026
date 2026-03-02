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
      return field ? field.value : null;
  };
  
  // Defaulting to 0 mileage if not found
  const mileageStr = getMeta('mileage');
  const mileage = mileageStr ? parseInt(mileageStr.replace(/,/g, '')) : 0;
  
  // Transmission
  const transVal = getMeta('transmission') || '';
  let transmission = 'AT'; // default
  
  const transSearchStr = (transVal + ' ' + (node.tags?.join(' ') || '') + ' ' + node.title).toLowerCase();
  
  if (transSearchStr.includes('manual') || transSearchStr.includes(' mt ') || transSearchStr.includes('-mt') || transSearchStr.includes(' mt') || transSearchStr.includes('ธรรมดา')) {
      transmission = 'MT';
  } else if (transSearchStr.includes(' AT ') || transSearchStr.includes('-at') || transSearchStr.includes(' at') || transSearchStr.includes('อัตโนมัติ') || transSearchStr.includes(' auto')) {
      transmission = 'AT';
  }

  // Fuel
  let fuel = ''; 
  const fVal = getMeta('fuel_type') || '';
  const titleLower = node.title.toLowerCase();
  const tagsLower = (node.tags?.join(' ') || '').toLowerCase();
  // Combine for general searching
  const searchStr = (fVal + ' ' + tagsLower + ' ' + titleLower).toLowerCase();

  // 1. Priority: Check known car models that are almost exclusively Diesel (unless explicit Benzine)
  const isDieselModel = [
    'isuzu', 'd-max', 'mu-x', 
    'hilux', 'revo', 'vigo', 'rocco', 
    'ranger', 'raptor', 'everest',
    'triton', 'pajero',
    'navara', 'terra',
    'colorado', 'trailblazer',
    'bt-50',
    'fortuner'
  ].some(keyword => titleLower.includes(keyword) || tagsLower.includes(keyword));

  // Check if it's explicitly Benzine (e.g. Hilux 2.7, Fortuner 2.7)
  const isExplicitBenzine = 
    titleLower.includes('2.7') || 
    titleLower.includes('benzine') || 
    titleLower.includes('เบนซิน') ||
    tagsLower.includes('benzine') ||
    tagsLower.includes('เบนซิน');

  if (isDieselModel && !isExplicitBenzine) {
      fuel = 'Diesel';
  } 
  // 2. Standard Detection from keywords
  else if (searchStr.includes('diesel') || searchStr.includes('ดีเซล')) {
    fuel = 'Diesel';
  } else if (searchStr.includes('hybrid') || searchStr.includes('ไฮบริด') || searchStr.includes('phev')) {
    fuel = 'Hybrid';
  } else if (searchStr.includes('ev') || searchStr.includes('ไฟฟ้า') || searchStr.includes('electric')) {
    fuel = 'EV';
  } else if (searchStr.includes('benzine') || searchStr.includes('เบนซิน') || searchStr.includes('เบนซิล') || searchStr.includes('gasoline') || searchStr.includes('petrol') || searchStr.includes('gasohol') || searchStr.includes('แก๊สโซฮอล์')) {
    fuel = 'Benzine';
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
