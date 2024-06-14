import startDb from '@/app/lib/db';
import { NextResponse } from 'next/server';
import Products from '@/models/productModel';
import { IncomingForm } from 'formidable';
import { upload, getFileStream } from '@/app/lib/s3';

import multer from 'multer';
import fs from 'fs';
import path from 'path';

await startDb();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
//   }),
// });

// handler.use(upload.single('image'));

export async function POST(req) {
  const reqData = await req.formData();
  let extractedData = {};
  for (const [key, value] of reqData.entries()) {
    extractedData[key] = value;
  }
  let { data, image } = extractedData;
  data = JSON.parse(data);
  const { name, type, size, lastModified } = image;

  try {
    console.log(image);
    const fileBuffer = await image.arrayBuffer();
    const fileName = `${name.split('.')[0]}_${Date.now()}.png`;
    // const filePath = path.join(process.cwd(), 'public', 'products', fileName);

    // await upload(Buffer.from(fileBuffer), fileName);
    const res = await upload(Buffer.from(fileBuffer), fileName);
    console.log('res:', res);
    // await fs.promises.writeFile(filePath, Buffer.from(fileBuffer));
    console.log('upload done');
    data.productImage = res.Key;
    console.log(data);
    const newProduct = await Products.create(data);
    return NextResponse.json({
      status: 'POST Success',
    });
  } catch (err) {
    NextResponse.json({ error: 'Failed to upload Product' });
  }
}
