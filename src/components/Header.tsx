
import React from 'react';
import { Heart, Stethoscope } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-2 rounded-full">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Arogya Sahayak</h1>
            <p className="text-blue-100 text-sm">ASHA Worker's AI Companion</p>
          </div>
        </div>
        <Heart className="h-6 w-6 text-red-300" />
      </div>
    </header>
  );
};

export default Header;
