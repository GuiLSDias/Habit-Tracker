import { useState, useEffect } from "react";

interface Habit {
  title: string;
  // Add other properties if needed, e.g., id, frequency, etc.
}

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState("");

  async function createHabit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadHabits(); // You can still use this helper function here
  }

  useEffect(() => {
    async function fetchHabits() {
      const res = await fetch("/api/habits");
      const data: Habit[] = await res.json(); // Explicitly type the fetched data
      setHabits(data); // Safely call setState here
    }

    fetchHabits(); // Call the async function inside the effect
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Meus Hábitos</h1>

      <form onSubmit={createHabit} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Novo hábito"
          className="flex-1 border p-2"
        />
        <button className="bg-black text-white px-4">+</button>
      </form>

      <ul>
        {habits.map((habit, index) => (
          <li key={index}>{habit.title}</li>
        ))}
      </ul>
    </div>
  );
}

function loadHabits() {
  throw new Error("Function not implemented.");
}
