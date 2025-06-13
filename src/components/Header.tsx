import React from 'react';
import { Scale, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl shadow-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                EthiGuide
                <Sparkles className="w-5 h-5 text-accent-500" />
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Ethical Decision Making</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Trusted by professionals</p>
              <p className="text-xs text-gray-500">Evidence-based ethical guidance</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;