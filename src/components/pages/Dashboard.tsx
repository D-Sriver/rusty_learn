import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { coursTree } from "@/articles/coursData";
import { CheckCircle, Clock, Flame } from "lucide-react";
import MobileSideMenu from "../navigation/MobileSideMenu";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

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

// Typage de la progression
interface ProgressItem {
  id: number;
  userId: number;
  chapitreKey: string;
  tempsPasse: number;
  dateValidation: string | null;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [resetMsg, setResetMsg] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/progress/${user.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("[DASHBOARD] Progression reçue:", data); // LOG
        setProgress(data);
      });
  }, [user]);

  if (!user) return null;

  const chapitresLus = progress.filter(p => p.dateValidation);
  const nbChapitresLus = chapitresLus.length;
  const totalChapitres = getTotalChapters();
  const totalTime = progress.reduce((acc, p) => acc + (p.tempsPasse || 0), 0);
  console.log("[DASHBOARD] Calcul temps total:", progress.map(p => p.tempsPasse), "=>", totalTime); // LOG

  // Streak calculé côté front (à partir des dates de validation)
  let streak = 0;
  if (chapitresLus.length > 0) {
    const days = chapitresLus
      .map(p => p.dateValidation && p.dateValidation.slice(0, 10))
      .filter(Boolean)
      .sort();
    let last = null;
    for (const d of days) {
      if (!last) {
        streak = 1;
        last = d;
      } else {
        const prev = new Date(last as string);
        const curr = new Date(d as string);
        const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak++;
        } else if (diff > 1) {
          streak = 1;
        }
        last = d;
      }
    }
  }

  // Chapitre préféré (le plus de temps passé)
  let chapitrePref = null;
  let tempsPref = 0;
  for (const p of progress) {
    if (p.tempsPasse > tempsPref) {
      tempsPref = p.tempsPasse;
      chapitrePref = p.chapitreKey;
    }
  }

  function getLabel(key: string) {
    for (const chap of coursTree) {
      for (const child of chap.children) {
        if (child.key === key) return child.label;
      }
    }
    return key;
  }

  // Trie les chapitres validés par dateValidation décroissante et ne garde que les 3 derniers
  const chapitresLusRecents = [...chapitresLus]
    .sort((a, b) => (b.dateValidation && a.dateValidation ? new Date(b.dateValidation).getTime() - new Date(a.dateValidation).getTime() : 0))
    .slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      {/* Menu mobile burger */}
      <MobileSideMenu selected={selected} onSelect={setSelected} open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      <div className="flex flex-col items-center w-full max-w-xl px-4">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-yellow-400 mb-1 text-center drop-shadow">Bienvenue, {user.username} !</h2>
        </div>
        {/* Streak */}
        <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in">
          <Flame className="w-7 h-7 text-orange-400 animate-pulse" />
          <span className="text-orange-300 font-bold text-lg">{streak} jour{streak > 1 ? "s" : ""} d'apprentissage consécutif{streak > 1 ? "s" : ""} !</span>
        </div>
        {/* Carte progression */}
        <div className="w-full bg-white/10 backdrop-blur rounded-2xl border border-white/10 shadow-xl p-6 flex flex-col gap-4 mb-6 animate-fade-in">
          {/* Message chapitre préféré */}
          {chapitrePref && tempsPref > 0 && (
            <div className="text-yellow-200 text-center text-base mb-2 animate-fade-in">
              Ton chapitre préféré est <span className="font-bold text-yellow-400">{getLabel(chapitrePref)}</span> <br></br>tu y as passé <span className="font-mono text-yellow-300">{formatTime(tempsPref)}</span> <span className="text-green-400">c'est impressionnant !</span>
            </div>
          )}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-yellow-300 font-bold text-lg">{nbChapitresLus} / {totalChapitres} chapitres validés</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-200 font-mono">{formatTime(totalTime)} au total</span>
            </div>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 transition-all duration-700"
              style={{ width: `${Math.round((nbChapitresLus / totalChapitres) * 100)}%` }}
            ></div>
          </div>
        </div>
        {/* Liste des chapitres validés */}
        <div className="w-full flex flex-col gap-3">
          <div className="text-yellow-300 font-semibold mb-1 text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Tes chapitres validés
          </div>
          {nbChapitresLus === 0 && (
            <div className="text-yellow-100 text-center italic">Tu n'as pas encore validé de chapitre...</div>
          )}
          {chapitresLusRecents.map(p => (
            <div
              key={p.chapitreKey}
              className="flex items-center justify-between bg-white/10 border border-white/10 rounded-xl shadow p-4 backdrop-blur-sm animate-fade-in"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-yellow-100 font-medium truncate max-w-[180px] md:max-w-xs">{getLabel(p.chapitreKey)}</span>
              </div>
              <span className="bg-yellow-400/80 text-yellow-900 font-bold rounded-full px-3 py-1 text-xs shadow-inner">
                {formatTime(p.tempsPasse || 0)}
              </span>
            </div>
          ))}
        </div>
        {/* Bouton réinitialiser la progression */}
        <button
          className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-150"
          onClick={async () => {
            if (!user) return;
            console.log("Appel reset pour userId:", user.id);
            await fetch(`${API_URL}/api/progress/reset/${user.id}`, { method: "DELETE" });
            setResetMsg("Progression réinitialisée !");
            // Recharge la progression
            fetch(`${API_URL}/api/progress/${user.id}`)
              .then(res => res.json())
              .then(data => {
                setProgress(data);
              });
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