import { NextResponse } from 'next/server';
import { getFileStream } from '@/app/lib/s3';
import { Writable } from 'stream';

export async function GET(req, context) {
  try {
    const { params } = context;
    const key = params.keyId;
    console.log(key);
    const url = await getFileStream(key);
    // readStream.pipe(NextResponse);
    console.log('url is:', url);
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'cannot get Image' }, { status: 404 });
  }
}
