import products from '@/models/productModel';
import Products from '@/models/productModel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await Products.find().select(
      'productName type dateIssued enabled'
    );
    return NextResponse.json({ data });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: error?.message, success: false });
  }
}

export async function PATCH(req) {
  try {
    const data = await req.json();
    if (!data) {
      throw new Error('No Data provided');
    }
    // console.log(data);
    await Promise.all(
      data.map(async (item) => {
        const id = item._id;
        const updated = await products.findByIdAndUpdate(
          id,
          {
            enabled: item?.enabled,
          },
          { new: true }
        );
        // console.log('updated:', updated);
      })
    );
    return NextResponse.json({ message: 'Success', success: true });
  } catch (error) {
    return NextResponse.json({ message: error?.message, success: false });
  }
}
