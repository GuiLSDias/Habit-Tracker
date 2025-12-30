"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const email = form.email.value;
          const password = form.password.value;

          await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard",
          });
        }}
        className="w-full max-w-sm space-y-3"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          className="w-full border p-2"
        />

        <button className="w-full rounded bg-blue-600 p-2 text-white">
          Entrar
        </button>
      </form>
    </div>
  );
}
