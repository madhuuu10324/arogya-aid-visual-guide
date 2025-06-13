
import React, { useState } from 'react';
import { Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CaseLoggerProps {
  analysisResult: any;
  onCaseSaved: () => void;
}

const CaseLogger: React.FC<CaseLoggerProps> = ({ analysisResult, onCaseSaved }) => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const saveCase = async () => {
    setIsSaving(true);
    
    // Simulate saving to database
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Case saved:', {
      patientId,
      patientName,
      timestamp: new Date().toISOString(),
      analysisResult,
    });
    
    setIsSaving(false);
    onCaseSaved();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Save className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Step 4: Save Case Record</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient ID
          </label>
          <Input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter patient ID"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name
          </label>
          <Input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Case Summary:</h3>
        <p className="text-sm text-gray-600">
          <strong>Recommendation:</strong> {analysisResult?.title}<br />
          <strong>Level:</strong> {analysisResult?.level}<br />
          <strong>Confidence:</strong> {analysisResult?.confidence}%<br />
          <strong>Date:</strong> {new Date().toLocaleDateString()}
        </p>
      </div>

      <Button 
        onClick={saveCase}
        disabled={!patientId || !patientName || isSaving}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isSaving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Saving Case...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Case Record
          </>
        )}
      </Button>
    </div>
  );
};

export default CaseLogger;
