import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Secret Credentials
    const validUsername = process.env.OFFICE_USERNAME || 'namplao-admin';
    const validPassword = process.env.OFFICE_PASSWORD || 'secret888';

    if (username === validUsername && password === validPassword) {
      cookies().set({
        name: 'office_session',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === 'production',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid ID or Passcode' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'System Error' }, { status: 500 });
  }
}
