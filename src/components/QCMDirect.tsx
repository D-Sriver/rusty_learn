import React from 'react';
import Quiz from './Quiz';

interface QCMDirectProps {
  question: string;
  options: string[];
  correctIndex: number;
}

export default function QCMDirect({ question, options, correctIndex }: QCMDirectProps) {
  const quizOptions = options.map((option, index) => ({
    label: option,
    correct: index === correctIndex
  }));

  return (
    <Quiz
      question={question}
      options={quizOptions}
      feedback={{
        correct: "Bravo, tu as l'œil du crabe !",
        incorrect: "Ce n'est pas ça, mais tu vas y arriver !"
      }}
    />
  );
} 