import { NextRequest, NextResponse } from 'next/server';
import { getProductTags, updateProductTags } from '@/lib/shopify-admin';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  // Security check: Verify session cookie
  const cookieStore = cookies();
  const session = cookieStore.get('office_session');

  if (!session || session.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const currentTags = await getProductTags(id);
    const RESERVED_TAGS = ['Reserved', 'จองแล้ว'];
    
    const isReserved = currentTags.some(tag => RESERVED_TAGS.includes(tag));
    
    let newTags: string[];
    let newStatus: boolean;

    if (isReserved) {
      // Remove reserved tags
      newTags = currentTags.filter(tag => !RESERVED_TAGS.includes(tag));
      newStatus = false;
    } else {
      // Add reserved tag
      newTags = [...currentTags, 'Reserved'];
      newStatus = true;
    }

    const result = await updateProductTags(id, newTags);

    if (!result?.productUpdate || (result.productUpdate.userErrors && result.productUpdate.userErrors.length > 0)) {
       return NextResponse.json({ 
         error: result?.productUpdate?.userErrors?.[0]?.message || 'Update failed' 
       }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      isReserved: newStatus,
      tags: newTags 
    });

  } catch (error) {
    console.error('Error toggling reserved status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
