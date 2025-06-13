
import React, { useState, useEffect } from 'react';
import { Brain, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIAnalysisProps {
  imageData: string;
  answers: {
    location: string;
    itching: string;
    duration: string;
  };
  onAnalysisComplete: (result: any) => void;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ imageData, answers, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real implementation, this would call actual AI APIs)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI analysis result based on answers
    let mockResult;
    
    // Simple logic to demo different severity levels
    if (answers.duration === 'More than 1 month' && answers.itching === 'Yes, severe') {
      mockResult = {
        level: 'RED',
        title: 'Urgent Referral Required',
        message: 'This condition requires immediate medical attention. Please refer to Primary Health Centre.',
        confidence: 85,
        possibleConditions: ['Chronic dermatitis', 'Fungal infection', 'Allergic reaction'],
        recommendations: ['Refer to PHC immediately', 'Document symptoms', 'Advise patient not to scratch']
      };
    } else if (answers.duration === '2-4 weeks' || answers.itching === 'Yes, moderate') {
      mockResult = {
        level: 'YELLOW',
        title: 'Monitor and Advise',
        message: 'This appears to be a mild condition. Monitor for 3 days and provide basic care advice.',
        confidence: 78,
        possibleConditions: ['Minor allergic reaction', 'Dry skin', 'Heat rash'],
        recommendations: ['Advise basic hygiene', 'Monitor for 3 days', 'Return if condition worsens']
      };
    } else {
      mockResult = {
        level: 'GREEN',
        title: 'Basic Care Sufficient',
        message: 'This appears to be a minor issue that can be managed with basic first aid.',
        confidence: 92,
        possibleConditions: ['Minor irritation', 'Insect bite', 'Mild dry skin'],
        recommendations: ['Provide basic first aid', 'Advise good hygiene', 'Follow up in 1 week']
      };
    }
    
    setResult(mockResult);
    setIsAnalyzing(false);
    onAnalysisComplete(mockResult);
  };

  const getResultColor = (level: string) => {
    switch (level) {
      case 'RED': return 'text-red-600 bg-red-50 border-red-200';
      case 'YELLOW': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'GREEN': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getResultIcon = (level: string) => {
    switch (level) {
      case 'RED': return <AlertTriangle className="h-6 w-6" />;
      case 'YELLOW': return <Clock className="h-6 w-6" />;
      case 'GREEN': return <CheckCircle className="h-6 w-6" />;
      default: return <Brain className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <Brain className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Step 3: AI Analysis</h2>
      </div>

      {!isAnalyzing && !result && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Ready to analyze the captured image and symptoms</p>
          <Button onClick={performAnalysis} className="w-full bg-blue-600 hover:bg-blue-700">
            <Brain className="h-4 w-4 mr-2" />
            Start AI Analysis
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Analyzing image and symptoms...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      )}

      {result && (
        <div className={`border-2 rounded-lg p-6 ${getResultColor(result.level)}`}>
          <div className="flex items-center mb-4">
            {getResultIcon(result.level)}
            <h3 className="text-xl font-bold ml-3">{result.title}</h3>
          </div>
          
          <p className="text-lg mb-4">{result.message}</p>
          
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Confidence: {result.confidence}%</p>
            <div className="w-full bg-white/50 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-current" 
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Possible Conditions:</h4>
            <ul className="list-disc list-inside text-sm">
              {result.possibleConditions.map((condition: string, index: number) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Recommended Actions:</h4>
            <ul className="list-disc list-inside text-sm">
              {result.recommendations.map((rec: string, index: number) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
