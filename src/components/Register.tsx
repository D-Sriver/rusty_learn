import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password, username);
    if (!error && useAuthStore.getState().user) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col shadow-xl backdrop-blur-xs bg-white/5 rounded-2xl border border-white/10  p-3">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">Créer un compte</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 rounded-xl p-6">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="rounded-lg px-4 py-2 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="rounded-lg px-4 py-2 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-400"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="rounded-lg px-4 py-2 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 rounded-lg shadow transition-all duration-150 disabled:opacity-60"
        >
          {loading ? "Création..." : "S'inscrire"}
        </button>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      </form>
    </div>
  );
} 