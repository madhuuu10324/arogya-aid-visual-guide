
import React, { useState } from 'react';
import Header from '@/components/Header';
import CameraCapture from '@/components/CameraCapture';
import SymptomQuestionnaire from '@/components/SymptomQuestionnaire';
import AIAnalysis from '@/components/AIAnalysis';
import CaseLogger from '@/components/CaseLogger';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [answers, setAnswers] = useState({
    location: '',
    itching: '',
    duration: ''
  });
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const isQuestionnaireComplete = () => {
    return answers.location && answers.itching && answers.duration;
  };

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setCurrentStep(4);
  };

  const handleCaseSaved = () => {
    toast({
      title: "Case Saved Successfully",
      description: "The patient case has been recorded for follow-up.",
    });
    
    // Reset for new case
    setCapturedImage(null);
    setAnswers({ location: '', itching: '', duration: '' });
    setAnalysisResult(null);
    setCurrentStep(1);
  };

  const startNewCase = () => {
    setCapturedImage(null);
    setAnswers({ location: '', itching: '', duration: '' });
    setAnalysisResult(null);
    setCurrentStep(1);
  };

  const canProceedToAnalysis = capturedImage && isQuestionnaireComplete();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container max-w-md mx-auto px-4 py-6">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-16 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Capture</span>
            <span>Describe</span>
            <span>Analyze</span>
            <span>Save</span>
          </div>
        </div>

        {/* App content */}
        <CameraCapture 
          onImageCaptured={setCapturedImage}
          capturedImage={capturedImage}
        />

        {capturedImage && (
          <SymptomQuestionnaire
            answers={answers}
            onAnswerChange={handleAnswerChange}
            isComplete={isQuestionnaireComplete()}
          />
        )}

        {canProceedToAnalysis && currentStep >= 3 && (
          <AIAnalysis
            imageData={capturedImage!}
            answers={answers}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {analysisResult && currentStep >= 4 && (
          <CaseLogger
            analysisResult={analysisResult}
            onCaseSaved={handleCaseSaved}
          />
        )}

        {/* Action buttons */}
        {capturedImage && isQuestionnaireComplete() && currentStep < 3 && (
          <Button 
            onClick={() => setCurrentStep(3)}
            className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
          >
            Proceed to AI Analysis
          </Button>
        )}

        {analysisResult && (
          <Button 
            onClick={startNewCase}
            variant="outline"
            className="w-full mt-4"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start New Case
          </Button>
        )}

        {/* Information footer */}
        <div className="mt-8 p-4 bg-white/70 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Remember:</strong> This tool assists your judgment but does not replace medical training. 
            When in doubt, always refer to PHC.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
