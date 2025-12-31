// logoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Erro ao realizar logout");
      }
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btn-logout px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium transition-colors"
    >
      Sair
    </button>
  );
}
