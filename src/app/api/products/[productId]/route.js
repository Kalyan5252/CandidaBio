import startDb from '@/app/lib/db';
import { NextResponse } from 'next/server';
import Products from '@/models/productModel';

await startDb();

export async function GET(req, context) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const type = searchParams.get('type');
  const { params } = context;

  const allProducts =
    type === 'id'
      ? await Products.find({ _id: params.productId })
      : await Products.find({ type: params.productId });
  if (!allProducts)
    return NextResponse.status(500).json({
      status: 'failure',
      message: 'Cannot get the Products',
    });
  return NextResponse.json({
    totalProducts: allProducts.length,
    products: allProducts,
  });
}
