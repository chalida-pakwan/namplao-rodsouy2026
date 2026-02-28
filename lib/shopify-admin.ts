const domain = process.env.SHOPIFY_STORE_DOMAIN || '8cf6bb-f8.myshopify.com';
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01';

async function shopifyAdminFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: object;
}): Promise<T | undefined> {
  if (!adminAccessToken) {
    console.error('SHOPIFY_ADMIN_ACCESS_TOKEN is missing');
    return undefined;
  }

  const endpoint = `https://${domain.replace(/^https?:\/\//, '')}/admin/api/${apiVersion}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!response.ok) {
        console.error(`Shopify Admin API Error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error('Response Body:', text);
        return undefined;
    }

    const json = await response.json();

    if (json.errors) {
      console.error('Shopify Admin API errors:', JSON.stringify(json.errors, null, 2));
      return undefined;
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching from Shopify Admin API:', error);
    return undefined;
  }
}

export async function getAdminProducts() {
  const query = `
    query getProducts {
      products(first: 250, reverse: true) {
        edges {
          node {
            id
            title
            handle
            status
            tags
            vendor
            featuredImage {
              url(transform: {maxWidth: 100, maxHeight: 100})
            }
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdminFetch<{
    products: {
      edges: Array<{
        node: any
      }>
    }
  }>({ query });

  return data?.products.edges.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    status: node.status,
    tags: node.tags,
    vendor: node.vendor,
    image: node.featuredImage?.url,
    price: node.priceRangeV2?.maxVariantPrice.amount,
    isReserved: node.tags.includes('Reserved') || node.tags.includes('จองแล้ว')
  })) || [];
}

export async function updateProductTags(id: string, tags: string[]) {
  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          tags
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      id,
      tags,
    },
  };

  return shopifyAdminFetch<{
    productUpdate: {
      product: {
        id: string;
        tags: string[];
      };
      userErrors: Array<{
        field: string[];
        message: string;
      }>;
    };
  }>({ query: mutation, variables });
}

export async function getProductTags(id: string): Promise<string[]> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        tags
      }
    }
  `;

  const data = await shopifyAdminFetch<{ product: { tags: string[] } }>({ 
    query, 
    variables: { id }
  });

  return data?.product?.tags || [];
}

