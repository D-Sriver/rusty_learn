import { useAuthStore } from "../store/useAuthStore";
import { useCoursStore } from "../store/useCoursStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { coursTree } from "../articles/coursData";
import { CheckCircle, Clock } from "lucide-react";

function formatTime(sec: number) {
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  return `${min} min ${s < 10 ? "0" : ""}${s} sec`;
}

function getTotalChapters() {
  let total = 0;
  for (const chap of coursTree) {
    total += chap.children.length;
  }
  return total;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const chapitresLus = useCoursStore(state => state.chapitresLus);
  const nbChapitresLus = chapitresLus.length;
  const tempsParChapitre = useCoursStore(state => state.tempsParChapitre);
  const totalChapitres = getTotalChapters();
  const totalTime = chapitresLus.reduce((acc, key) => acc + (tempsParChapitre[key] || 0), 0);
  const resetProgression = useCoursStore(state => state.resetProgression);
  const [resetMsg, setResetMsg] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  // Récupérer le label du chapitre à partir de la clé
  function getLabel(key: string) {
    for (const chap of coursTree) {
      for (const child of chap.children) {
        if (child.key === key) return child.label;
      }
    }
    return key;
  }

  // Trouver le chapitre préféré (le plus de temps passé)
  let chapitrePref = null;
  let tempsPref = 0;
  for (const key of chapitresLus) {
    const t = tempsParChapitre[key] || 0;
    if (t > tempsPref) {
      tempsPref = t;
      chapitrePref = key;
    }
  }

  const progress = Math.round((nbChapitresLus / totalChapitres) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <div className="flex flex-col items-center w-full max-w-xl px-4">
        {/* Avatar et titre */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-yellow-400 mb-1 text-center drop-shadow">Bienvenue, {user.username} !</h2>
        </div>
        {/* Carte progression */}
        <div className="w-full bg-white/10 backdrop-blur rounded-2xl border border-white/10 shadow-xl p-6 flex flex-col gap-4 mb-6 animate-fade-in">
         
          <div className="flex flex-col md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-yellow-300 font-bold text-lg">{nbChapitresLus} / {totalChapitres} chapitres validés</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-200 font-mono">{formatTime(totalTime)} au total</span>
            </div>
          </div>
          {/* Barre de progression */}
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
           {/* Message chapitre préféré */}
           {chapitrePref && tempsPref > 0 && (
            <div className="text-yellow-200 text-center text-base mb-2 animate-fade-in">
              Ton chapitre préféré est <span className="font-bold text-yellow-400">{getLabel(chapitrePref)}</span> <br></br>tu y as passé <span className="font-mono text-yellow-300">{formatTime(tempsPref)}</span> <span className="text-green-400">c'est impressionnant !</span>
            </div>
          )}
        </div>
      {/* Bouton réinitialiser la progression */}
      <button
        className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-150"
        onClick={() => {
          resetProgression();
          setResetMsg("Progression réinitialisée !");
          setTimeout(() => setResetMsg(""), 2000);
        }}
      >
        Réinitialiser la progression
      </button>
      {resetMsg && (
        <div className="mt-2 text-center text-green-400 font-semibold animate-fade-in">{resetMsg}</div>
      )}
      </div>
    </div>
  );
} 