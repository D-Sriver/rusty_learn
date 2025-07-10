import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center backdrop-blur rounded-xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-700">Bienvenue sur ton dashboard, {user.username} !</h2>
      <div className="bg-white/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 w-96">
        <div className="text-lg text-yellow-700">Tu es connecté 🎉</div>
        {/* Ici tu pourras ajouter la progression, les chapitres, etc. */}
      </div>
    </div>
  );
} 