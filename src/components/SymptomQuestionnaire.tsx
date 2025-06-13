
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SymptomQuestionnaireProps {
  answers: {
    location: string;
    itching: string;
    duration: string;
  };
  onAnswerChange: (question: string, answer: string) => void;
  isComplete: boolean;
}

const SymptomQuestionnaire: React.FC<SymptomQuestionnaireProps> = ({
  answers,
  onAnswerChange,
  isComplete
}) => {
  const questions = [
    {
      id: 'location',
      question: 'Where is the rash located?',
      options: ['Face', 'Hands', 'Arms', 'Legs', 'Body', 'Multiple areas']
    },
    {
      id: 'itching',
      question: 'Does it itch?',
      options: ['No', 'A little', 'Yes, moderate', 'Yes, severe']
    },
    {
      id: 'duration',
      question: 'How long has it been there?',
      options: ['Less than 1 week', '1-2 weeks', '2-4 weeks', 'More than 1 month']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <FileText className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Step 2: Answer Questions</h2>
      </div>

      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id}>
            <h3 className="font-medium text-gray-700 mb-3">{q.question}</h3>
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((option) => (
                <Button
                  key={option}
                  variant={answers[q.id as keyof typeof answers] === option ? "default" : "outline"}
                  onClick={() => onAnswerChange(q.id, option)}
                  className="justify-start h-auto p-3 text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ All questions answered</p>
        </div>
      )}
    </div>
  );
};

export default SymptomQuestionnaire;
