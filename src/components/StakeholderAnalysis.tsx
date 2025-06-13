import React from 'react';
import { Users, TrendingUp, TrendingDown, Minus, AlertCircle, Heart } from 'lucide-react';
import { DilemmaData, Stakeholder } from '../types/DilemmaTypes';

interface StakeholderAnalysisProps {
  dilemma: DilemmaData;
}

const StakeholderAnalysis: React.FC<StakeholderAnalysisProps> = ({ dilemma }) => {
  // Generate stakeholder analysis based on dilemma data
  const generateStakeholders = (): Stakeholder[] => {
    const baseStakeholders = dilemma.stakeholders.map((name, index) => ({
      name,
      relationship: generateRelationship(name, dilemma.category),
      impact: generateImpact(index),
      importance: Math.floor(Math.random() * 3) + 7, // 7-9 range for realistic importance
      concerns: generateConcerns(name, dilemma.category, dilemma.values)
    }));

    // Add some implicit stakeholders based on category
    const implicitStakeholders = generateImplicitStakeholders(dilemma.category);
    
    return [...baseStakeholders, ...implicitStakeholders];
  };

  const generateRelationship = (name: string, category: string): string => {
    const relationships = {
      'Business Ethics': ['Employee', 'Client', 'Shareholder', 'Partner', 'Customer'],
      'Medical Ethics': ['Patient', 'Family Member', 'Healthcare Provider', 'Administrator'],
      'Environmental Ethics': ['Community Member', 'Future Generation', 'Wildlife', 'Organization'],
      'Technology Ethics': ['User', 'Developer', 'Regulator', 'Society at Large'],
      'Professional Ethics': ['Colleague', 'Client', 'Supervisor', 'Professional Body'],
      'Personal Ethics': ['Family Member', 'Friend', 'Community Member', 'Self'],
      'Legal Ethics': ['Client', 'Court System', 'Legal Profession', 'Public'],
      'Research Ethics': ['Research Participant', 'Academic Community', 'Funder', 'Society']
    };
    
    const categoryRelationships = relationships[category as keyof typeof relationships] || ['Stakeholder'];
    return categoryRelationships[Math.floor(Math.random() * categoryRelationships.length)];
  };

  const generateImpact = (index: number): 'positive' | 'negative' | 'neutral' => {
    const impacts: ('positive' | 'negative' | 'neutral')[] = ['positive', 'negative', 'neutral'];
    return impacts[index % 3];
  };

  const generateConcerns = (name: string, category: string, values: string[]): string[] => {
    const baseConcerns = [
      'Fairness and equity in treatment',
      'Transparency in decision-making process',
      'Long-term consequences of actions',
      'Respect for individual rights',
      'Economic or financial implications'
    ];

    const categorySpecificConcerns = {
      'Business Ethics': ['Profit margins', 'Employee welfare', 'Market competition', 'Corporate reputation'],
      'Medical Ethics': ['Patient safety', 'Privacy protection', 'Quality of care', 'Professional standards'],
      'Environmental Ethics': ['Environmental protection', 'Sustainability', 'Future generations', 'Ecosystem health'],
      'Technology Ethics': ['Data privacy', 'Algorithmic bias', 'Digital rights', 'Technological access'],
      'Professional Ethics': ['Professional integrity', 'Competence standards', 'Client confidentiality', 'Industry reputation'],
      'Personal Ethics': ['Personal values alignment', 'Relationship harmony', 'Self-respect', 'Family impact'],
      'Legal Ethics': ['Justice administration', 'Legal precedent', 'Client representation', 'Public trust'],
      'Research Ethics': ['Research integrity', 'Participant protection', 'Scientific validity', 'Knowledge advancement']
    };

    const specific = categorySpecificConcerns[category as keyof typeof categorySpecificConcerns] || [];
    const allConcerns = [...baseConcerns, ...specific];
    
    // Return 2-3 random concerns
    const shuffled = allConcerns.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
  };

  const generateImplicitStakeholders = (category: string): Stakeholder[] => {
    const implicit = {
      'Business Ethics': [{ name: 'Industry Standards', relationship: 'Regulatory Body' }],
      'Medical Ethics': [{ name: 'Healthcare System', relationship: 'Institution' }],
      'Environmental Ethics': [{ name: 'Future Generations', relationship: 'Beneficiary' }],
      'Technology Ethics': [{ name: 'Digital Society', relationship: 'Affected Community' }],
      'Professional Ethics': [{ name: 'Professional Standards', relationship: 'Regulatory Body' }],
      'Personal Ethics': [{ name: 'Personal Integrity', relationship: 'Self' }],
      'Legal Ethics': [{ name: 'Justice System', relationship: 'Institution' }],
      'Research Ethics': [{ name: 'Scientific Community', relationship: 'Professional Body' }]
    };

    const categoryImplicit = implicit[category as keyof typeof implicit] || [];
    
    return categoryImplicit.map((item, index) => ({
      name: item.name,
      relationship: item.relationship,
      impact: generateImpact(index + 10),
      importance: Math.floor(Math.random() * 2) + 6, // 6-7 range for implicit stakeholders
      concerns: generateConcerns(item.name, category, [])
    }));
  };

  const stakeholders = generateStakeholders();

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'negative': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'negative': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getImportanceColor = (importance: number) => {
    if (importance >= 8) return 'bg-red-500';
    if (importance >= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Stakeholder Impact Analysis</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Understanding how your decision affects all parties involved is crucial for ethical decision-making.
        </p>
      </div>

      {/* Stakeholder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stakeholders.map((stakeholder, index) => (
          <div key={index} className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl ${getImpactColor(stakeholder.impact)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{stakeholder.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{stakeholder.relationship}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getImpactIcon(stakeholder.impact)}
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: `${getImportanceColor(stakeholder.importance)}` }}></div>
                  <span className="text-xs font-medium text-gray-600">{stakeholder.importance}/10</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Key Concerns
              </h4>
              <ul className="space-y-1">
                {stakeholder.concerns.map((concern, concernIndex) => (
                  <li key={concernIndex} className="text-sm text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500" />
          Stakeholder Impact Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Positive Impact</h4>
            <p className="text-2xl font-bold text-green-600">
              {stakeholders.filter(s => s.impact === 'positive').length}
            </p>
            <p className="text-sm text-gray-600">stakeholders benefit</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Negative Impact</h4>
            <p className="text-2xl font-bold text-red-600">
              {stakeholders.filter(s => s.impact === 'negative').length}
            </p>
            <p className="text-sm text-gray-600">stakeholders affected</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Minus className="w-8 h-8 text-gray-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Neutral Impact</h4>
            <p className="text-2xl font-bold text-gray-600">
              {stakeholders.filter(s => s.impact === 'neutral').length}
            </p>
            <p className="text-sm text-gray-600">stakeholders unaffected</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Key Recommendations</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Prioritize high-importance stakeholders in your decision-making process</li>
            <li>• Consider mitigation strategies for negatively impacted parties</li>
            <li>• Engage in transparent communication with all affected stakeholders</li>
            <li>• Monitor long-term effects on relationships and trust</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StakeholderAnalysis;