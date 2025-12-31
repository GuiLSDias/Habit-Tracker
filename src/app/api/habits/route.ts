import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { title, frequency } = await req.json();
  if (!title || !frequency) {
    return NextResponse.json(
      { error: "Título e frequência são obrigatórios" },
      { status: 400 }
    );
  }
  const validFrequencies = ["DAILY", "WEEKLY", "MONTHLY"];
  if (!validFrequencies.includes(frequency)) {
    return NextResponse.json(
      { error: "Frequência inválida. Use: DAILY, WEEKLY ou MONTHLY." },
      { status: 400 }
    );
  }

  const habit = await prisma.habit.create({
    data: {
      title,
      userId: user.id,
      frequency,
    },
  });

  return NextResponse.json(habit);
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(habits);
}
