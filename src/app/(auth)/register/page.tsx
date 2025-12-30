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
    <form
      onSubmit={handleSubmit}
      className="flex min-h-screen flex-col items-center justify-center space-y-2"
    >
      <input name="email" placeholder="Email" className="border p-2" />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        className="border p-2"
      />
      <button className="rounded bg-green-600 p-2 text-white">
        Criar conta
      </button>
    </form>
  );
}
