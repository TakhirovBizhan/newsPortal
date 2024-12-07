import bcrypt from "bcryptjs";
import prisma from "../../../../prisma/client";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created", user }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ error: "Error creating user" }),
      { status: 500 }
    );
  }
}