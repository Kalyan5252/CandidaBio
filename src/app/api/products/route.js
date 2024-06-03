import { NextResponse } from 'next/server';

import mongoose from 'mongoose';
import startDb from '@/app/lib/db';
import Products from '@/models/productModel';
await startDb();
export async function GET(req) {
  const allProducts = await Products.find();
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

export async function POST(req) {
  // await startDb();
  const rebody = await req.json();
  // console.log(rebody);
  const data = await Products.create(rebody);
  return NextResponse.json({
    status: 'POST Success',
    // data,
  });
}
