import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(request) {

  try {

    const body = await request.json();

    const { name, email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name?.trim() || null,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      },
    });

    return Response.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      { status: 201 }
    );

  } catch (error) {

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }
}
