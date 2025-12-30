"use client";

import bcrypt from "bcrypt";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        <div className="flex min-h-50 items-center justify-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-green-400 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>

            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
              HabitFlow
            </h1>
          </div>
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded"
        />
        <button className="w-full rounded bg-green-200 p-2 text-black">
          Criar conta
        </button>
      </form>
    </div>
  );
}
