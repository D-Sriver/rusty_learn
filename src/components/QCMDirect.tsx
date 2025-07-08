import Quiz from './Quiz';

interface QCMDirectProps {
  question: string;
  options: string[];
  correctIndex: number;
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
}

export default function QCMDirect({ 
  question, 
  options, 
  correctIndex, 
  feedbackCorrect = "Bravo, tu as l'œil du crabe !",
  feedbackIncorrect = "Ce n'est pas ça, mais tu vas y arriver !"
}: QCMDirectProps) {
  const quizOptions = options.map((option, index) => ({
    label: option,
    correct: index === correctIndex
  }));

  return (
    <Quiz
      question={question}
      options={quizOptions}
      feedback={{
        correct: feedbackCorrect,
        incorrect: feedbackIncorrect
      }}
    />
  );
} 