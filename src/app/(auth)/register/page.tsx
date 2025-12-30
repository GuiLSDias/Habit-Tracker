"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Conta criada com sucesso!");
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
          placeholder="Nome"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Senha"
          type="password"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full rounded bg-green-200 p-2 text-black"
          onClick={() => router.push("/login")}
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}
