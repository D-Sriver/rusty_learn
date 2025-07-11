import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (!error && useAuthStore.getState().user) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col shadow-xl backdrop-blur-xs bg-white/5 rounded-2xl border border-white/10  p-3">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Connexion</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 rounded-xl p-6">
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
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      </form>
      <div className="mt-4 text-center text-yellow-300 text-sm">
        Pas encore de compte ?
        <Link to="/register" className="ml-1 text-yellow-500 underline hover:text-yellow-700 transition-colors">Créer un compte</Link>
      </div>
    </div>
  );
} 