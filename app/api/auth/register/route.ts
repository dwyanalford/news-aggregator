// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import validator from 'validator';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Basic validation checks
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Email format validation
    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    // Name validation (optional: adjust as needed)
    if (!validator.isLength(name, { min: 2, max: 50 })) {
      return NextResponse.json({ error: 'Name must be between 2 and 50 characters.' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email.' }, { status: 400 });
    }

    // Hash the password securely
    const hashedPassword = await hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Respond with success message, exclude sensitive info
    return NextResponse.json({
      message: 'User registered successfully!',
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Something went wrong, please try again.' }, { status: 500 });
  }
}
