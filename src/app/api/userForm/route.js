import userForms from '@/models/userFormModel';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const data = await userForms.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error Occured', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);
    // const newData = await userForms.create(data);
    if (!newData) throw new Error('Cannot Submit Message');
    return NextResponse.json(
      { message: 'Form Submitted Successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error Occured', message: error.message },
      { status: 500 }
    );
  }
}
