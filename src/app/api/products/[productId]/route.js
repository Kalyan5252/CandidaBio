import startDb from '@/app/lib/db';
import { NextResponse } from 'next/server';
import Products from '@/models/productModel';
import { upload, getFileStream } from '@/app/lib/s3';

await startDb();

export async function GET(req, context) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const type = searchParams.get('type');
  const { params } = context;

  const allProducts =
    type === 'id'
      ? await Products.find({ _id: params.productId, enabled: true })
      : await Products.find({ type: params.productId, enabled: true });
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

export async function PATCH(req, context) {
  try {
    const { params } = context;
    const id = params.productId;
    if (!id) {
      throw new Error('Product not exists');
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const type = searchParams.get('dataType');

    // console.log('dataType is', type);

    if (type === 'formData') {
      const reqData = await req.formData();
      let extractedData = {};
      for (const [key, value] of reqData.entries()) {
        extractedData[key] = value;
      }
      let { data, productImage } = extractedData;
      data = JSON.parse(data);

      const { name, type, size, lastModified } = productImage;
      const fileBuffer = await productImage.arrayBuffer();
      const fileName = `${name.split('.')[0]}_${Date.now()}.png`;
      const res = await upload(Buffer.from(fileBuffer), fileName);
      data.productImage = res.Key;

      data.imgLoc = 'cloud';
      const id = data._id;
      const updated = await Products.findByIdAndUpdate(id, data, { new: true });
    } else {
      const data = await req.json();
      const id = data._id;
      if (!id) throw new Error('No Product found');
      await Products.findByIdAndUpdate(id, data, { new: true });
    }

    // console.log('success');
    return NextResponse.json({ success: true });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: error?.message, success: false });
  }
}

export async function DELETE(req, context) {
  try {
    const { params } = context;
    const id = params.productId;
    if (!id) {
      throw new Error('Product not exists');
    }
    await Products.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error?.message, success: false });
  }
}
