"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewHabitPage() {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, frequency }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        console.error("Erro ao criar hábito");
      }
    } catch (error) {
      console.error("Erro ao criar hábito:", error);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 tracking-tight mb-6">
            Criar Novo Hábito
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Título do Hábito
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
                placeholder="Ex: Beber água"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Frequência
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2"
                required
              >
                <option value="">Selecione a frequência</option>
                <option value="DAILY">Diário</option>
                <option value="WEEKLY">Semanal</option>
                <option value="MONTHLY">Mensal</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 text-sm font-medium transition-all shadow-lg shadow-gray-200"
              >
                Criar Hábito
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
