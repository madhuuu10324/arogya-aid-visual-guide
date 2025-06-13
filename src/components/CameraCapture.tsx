
import React, { useState, useRef } from 'react';
import { Camera, Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onImageCaptured: (imageData: string) => void;
  capturedImage: string | null;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCaptured, capturedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        onImageCaptured(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    onImageCaptured('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Camera className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Step 1: Capture Image</h2>
      </div>
      
      {capturedImage ? (
        <div className="text-center">
          <div className="relative inline-block">
            <img 
              src={capturedImage} 
              alt="Captured skin condition" 
              className="w-full max-w-sm rounded-lg shadow-md mx-auto"
            />
          </div>
          <Button 
            onClick={retakePhoto}
            variant="outline"
            className="mt-4 w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Photo
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Take a clear, well-lit photo of the affected skin area</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Ensure good lighting and the affected area is clearly visible
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
