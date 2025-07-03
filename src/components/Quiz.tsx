import { useState } from 'react';

interface Option {
  label: string;
  correct: boolean;
}

interface QuizProps {
  question: string;
  options: Option[];
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export default function Quiz({ question, options, feedback }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const isCorrect = selected !== null && options[selected].correct;

  const handleRetry = () => {
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="my-6 p-4 bg-white/10 border border-yellow-400/30 rounded-2xl shadow-xl backdrop-blur-md">
      <div className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
        <span className="text-2xl">🦀</span> QCM de Rusty
      </div>
      <div className="mb-3 text-lg text-white">{question}</div>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            disabled={answered}
            onClick={() => { setSelected(i); setAnswered(true); }}
            className={`px-4 py-2 rounded-lg border transition-all text-left
              ${answered
                ? (i === selected
                    ? (opt.correct ? 'bg-yellow-400/20 border-yellow-400 text-yellow-200' : 'bg-red-400/10 border-red-400 text-red-200')
                    : 'bg-white/5 border-white/10 text-white/80')
                : 'bg-white/5 border-white/10 hover:bg-yellow-400/10 hover:border-yellow-400/40 hover:text-yellow-200'}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {answered && (
        <div className="mt-4 flex flex-col gap-2 items-start">
          <div className={`font-semibold ${isCorrect ? 'text-yellow-300' : 'text-red-300'}`}>
            {isCorrect ? feedback.correct : feedback.incorrect}
          </div>
          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 rounded-lg bg-yellow-400/20 text-yellow-200 border border-yellow-400/40 hover:bg-yellow-400/40 hover:text-yellow-900 transition-all font-bold"
            >
              Réessayer
            </button>
          )}
        </div>
      )}
    </div>
  );
} 