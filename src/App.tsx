import React, { useState } from 'react';
import { Scale, Brain, Users, TrendingUp, FileText, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import DilemmaInput from './components/DilemmaInput';
import EthicalAnalysis from './components/EthicalAnalysis';
import StakeholderAnalysis from './components/StakeholderAnalysis';
import OutcomePredictor from './components/OutcomePredictor';
import RecommendationEngine from './components/RecommendationEngine';
import CaseStudies from './components/CaseStudies';
import { DilemmaData } from './types/DilemmaTypes';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dilemmaData, setDilemmaData] = useState<DilemmaData | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const steps = [
    { id: 'input', title: 'Describe Dilemma', icon: FileText },
    { id: 'ethical', title: 'Ethical Analysis', icon: Scale },
    { id: 'stakeholders', title: 'Stakeholder Impact', icon: Users },
    { id: 'outcomes', title: 'Predict Outcomes', icon: TrendingUp },
    { id: 'recommendation', title: 'Get Recommendation', icon: Brain },
  ];

  const handleDilemmaSubmit = (data: DilemmaData) => {
    setDilemmaData(data);
    setCurrentStep(1);
    setAnalysisComplete(true);
  };

  const handleStepClick = (stepIndex: number) => {
    if (analysisComplete || stepIndex === 0) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = analysisComplete && index < currentStep;
              const isAccessible = analysisComplete || index === 0;
              
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={!isAccessible}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg scale-105'
                        : isCompleted
                        ? 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                        : isAccessible
                        ? 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium text-center">{step.title}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in">
          {currentStep === 0 && (
            <DilemmaInput onSubmit={handleDilemmaSubmit} />
          )}
          
          {currentStep === 1 && dilemmaData && (
            <EthicalAnalysis dilemma={dilemmaData} />
          )}
          
          {currentStep === 2 && dilemmaData && (
            <StakeholderAnalysis dilemma={dilemmaData} />
          )}
          
          {currentStep === 3 && dilemmaData && (
            <OutcomePredictor dilemma={dilemmaData} />
          )}
          
          {currentStep === 4 && dilemmaData && (
            <RecommendationEngine dilemma={dilemmaData} />
          )}
        </div>

        {/* Case Studies Section */}
        {analysisComplete && (
          <div className="mt-16">
            <CaseStudies />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;