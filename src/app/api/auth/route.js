import Users from '@/models/userModel';
import { NextResponse } from 'next/server';
import startDb from '@/app/lib/db';
import jwt, { verify } from 'jsonwebtoken';
// import crypto from 'crypto';
// import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { promisify } from 'util';

await startDb();

const SECRET_KEY = process.env.SECRET_KEY;

// export async function encrypt(payload) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime(3600)
//     .sign(secretKey);
// }

const sign = (id) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: '1h',
  });
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error('No such User Found');
    }
    if (user.password !== password) throw new Error('Incorrect Credentials');
    // const userId = user._id;
    // const expires = new Date(Date.now() + 60 * 60 * 1000);
    // const token = encrypt({ userId, expires });
    const token = sign(user._id);

    const response = NextResponse.json(
      {
        userDetected: user ? 'User Found' : 'No User found',
      },
      { status: 200 }
    );
    response.cookies.set('CandidaKey', token, {
      httpOnly: true,
      path: '/',
      maxAge: new Date(60 * 60),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Error Occured', message: error.message },
      { status: 404 }
    );
  }
}

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('CandidaKey').value;
    // console.log(token);
    if (!token) throw new Error('No Login found');
    const decoded = jwt.verify(token, SECRET_KEY);
    // const decoded = verifyToken(req);
    // console.log(decoded);
    if (!decoded) throw new Error('Unauthorised');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Admin not Logged in', message: error.message },
      { status: 404 }
    );
  }
}
