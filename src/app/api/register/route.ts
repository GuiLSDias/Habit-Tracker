import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email e senha obrigatórios" },
      { status: 400 }
    );
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    id: user.id,
    email: user.email,
  });
}
