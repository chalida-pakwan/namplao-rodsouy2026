export const dynamic = 'force-dynamic';

import { getAdminProducts } from '@/lib/shopify-admin';
import OfficeDashboardClient from './OfficeDashboardClient';

export default async function OfficeDashboard() {
  const products = await getAdminProducts();
  
  return (
    <OfficeDashboardClient initialProducts={products} />
  );
}
