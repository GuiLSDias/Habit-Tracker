import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/logoutbutton";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          habits: true,
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-amber-50">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 tracking-tight">
            HabitFlow
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Olá, {user.name ?? user.email}
            </span>

            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Meus hábitos</h2>

            <Link
              href="/dashboard/habits/"
              className="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 text-sm font-medium transition-all shadow-lg shadow-gray-200"
            >
              + Novo hábito
            </Link>
          </div>

          {user.habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                🌱
              </div>
              <p className="text-gray-500 text-lg font-medium mb-2">
                Você ainda não tem hábitos.
              </p>
              <p className="text-gray-400 text-sm">Que tal começar hoje?</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.habits.map((habit) => (
                <li
                  key={habit.id}
                  className="group border border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-md transition-all bg-white cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800 text-lg group-hover:text-green-700 transition-colors">
                      {habit.title}
                    </h3>
                    {/* Placeholder para ícone ou status */}
                    <span className="w-2 h-2 rounded-full bg-green-400 mt-2"></span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Clique para ver detalhes
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
