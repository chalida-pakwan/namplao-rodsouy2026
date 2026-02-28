// Reuse Dashboard client logic but adapt for new path
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2, Circle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  handle: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
  tags: string[];
  vendor: string;
  image: string;
  price?: string;
  isReserved: boolean;
}

export default function OfficeDashboardClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleToggleReserved = async (product: Product) => {
    if (updatingId) return;
    setUpdatingId(product.id);

    // Optimistic Update
    const newReservedStatus = !product.isReserved;
    setProducts(prev => prev.map(p => 
      p.id === product.id ? { ...p, isReserved: newReservedStatus } : p
    ));

    try {
      const res = await fetch('/api/admin/toggle-reserved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id }),
      });

      if (!res.ok) throw new Error('Update failed');

      const data = await res.json();
      
      if (data.success) {
         setProducts(prev => prev.map(p => 
           p.id === product.id ? { ...p, isReserved: data.isReserved, tags: data.tags } : p
         ));
         router.refresh(); 
      }

    } catch (error) {
      console.error(error);
      setProducts(prev => prev.map(p => 
        p.id === product.id ? { ...p, isReserved: product.isReserved } : p
      ));
      alert('Error updating status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Inventory Status</h2>
        <button 
          onClick={handleRefresh} 
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Availability</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Shopify</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className={`hover:bg-gray-50/50 transition-colors ${product.status === 'ARCHIVED' ? 'opacity-60 grayscale' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap w-24">
                    <div className="relative h-16 w-24 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                      {product.image ? (
                         <Image src={product.image} alt={product.title} fill className="object-cover" sizes="100px" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900 line-clamp-1">{product.title}</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">{product.price ? `฿${parseInt(product.price).toLocaleString()}` : '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleToggleReserved(product)}
                      disabled={updatingId === product.id}
                      className={`
                        relative inline-flex items-center px-4 py-2 border rounded-full text-sm font-medium focus:outline-none transition-all duration-300 shadow-sm
                        ${product.isReserved 
                          ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:shadow-red-100' 
                          : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:shadow-emerald-100'
                        }
                        ${updatingId === product.id ? 'cursor-wait opacity-80' : ''}
                      `}
                    >
                      {updatingId === product.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        product.isReserved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2" />
                      )}
                      {product.isReserved ? 'Reserved' : 'Available'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                     <a 
                       href={`https://admin.shopify.com/store/${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'kn-goodcar'}/products/${product.id.split('/').pop()}`} 
                       target="_blank" 
                       rel="noreferrer"
                       className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium text-xs"
                     >
                       Manage
                     </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
