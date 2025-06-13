import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Target, BarChart3 } from 'lucide-react';
import { DilemmaData, Outcome } from '../types/DilemmaTypes';

interface OutcomePredictorProps {
  dilemma: DilemmaData;
}

const OutcomePredictor: React.FC<OutcomePredictorProps> = ({ dilemma }) => {
  // Generate outcome predictions based on dilemma data
  const generateOutcomes = (): Outcome[] => {
    const scenarios = [
      {
        scenario: 'Best Case Scenario',
        probability: 0.25,
        riskLevel: 'low' as const,
        consequences: [
          'All stakeholders feel their concerns were addressed',
          'Strengthened relationships and trust',
          'Positive precedent set for future decisions',
          'Values alignment maintained successfully'
        ],
        ethicalImplications: [
          'Demonstrates commitment to ethical principles',
          'Builds reputation for moral leadership',
          'Creates positive organizational culture',
          'Inspires similar ethical behavior in others'
        ]
      },
      {
        scenario: 'Most Likely Scenario',
        probability: 0.45,
        riskLevel: 'medium' as const,
        consequences: [
          'Majority of stakeholder concerns addressed',
          'Some short-term challenges in implementation',
          'Mixed reactions from different groups',
          'Need for ongoing communication and adjustment'
        ],
        ethicalImplications: [
          'Balances competing ethical demands',
          'May require compromise on some values',
          'Demonstrates practical ethical decision-making',
          'Requires careful monitoring of long-term effects'
        ]
      },
      {
        scenario: 'Challenging Scenario',
        probability: 0.20,
        riskLevel: 'high' as const,
        consequences: [
          'Significant stakeholder resistance',
          'Potential damage to key relationships',
          'Resource intensive implementation',
          'Public scrutiny and criticism'
        ],
        ethicalImplications: [
          'Tests commitment to ethical principles',
          'May create moral distress for decision-makers',
          'Could undermine trust if not handled well',
          'Requires strong ethical justification'
        ]
      },
      {
        scenario: 'Worst Case Scenario',
        probability: 0.10,
        riskLevel: 'high' as const,
        consequences: [
          'Severe stakeholder backlash',
          'Legal or regulatory consequences',
          'Long-term reputation damage',
          'Loss of stakeholder trust and support'
        ],
        ethicalImplications: [
          'Fundamental ethical principles violated',
          'Creates negative moral precedent',
          'Damages ethical reputation long-term',
          'May require corrective action or apology'
        ]
      }
    ];

    return scenarios;
  };

  const outcomes = generateOutcomes();

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'medium': return <Clock className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getProbabilityWidth = (probability: number) => `${probability * 100}%`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Outcome Prediction Analysis</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Analyzing potential scenarios and their likelihood to help you prepare for various outcomes.
        </p>
      </div>

      {/* Outcome Scenarios */}
      <div className="space-y-6 mb-8">
        {outcomes.map((outcome, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start space-x-4 mb-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 ${getRiskColor(outcome.riskLevel)}`}>
                {getRiskIcon(outcome.riskLevel)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{outcome.scenario}</h3>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getRiskColor(outcome.riskLevel)}`}>
                      {outcome.riskLevel} Risk
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      {Math.round(outcome.probability * 100)}%
                    </span>
                  </div>
                </div>
                
                {/* Probability Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: getProbabilityWidth(outcome.probability) }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Potential Consequences
                </h4>
                <ul className="space-y-2">
                  {outcome.consequences.map((consequence, conseqIndex) => (
                    <li key={conseqIndex} className="flex items-start text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {consequence}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Ethical Implications
                </h4>
                <ul className="space-y-2">
                  {outcome.ethicalImplications.map((implication, implIndex) => (
                    <li key={implIndex} className="flex items-start text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {implication}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Assessment Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-blue-600" />
          Risk Assessment Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Success Probability</h4>
            <p className="text-2xl font-bold text-green-600">70%</p>
            <p className="text-sm text-gray-600">positive outcomes likely</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Implementation Time</h4>
            <p className="text-2xl font-bold text-yellow-600">
              {dilemma.urgency === 'critical' ? '1-7 days' : 
               dilemma.urgency === 'high' ? '1-4 weeks' :
               dilemma.urgency === 'medium' ? '1-3 months' : '3-6 months'}
            </p>
            <p className="text-sm text-gray-600">expected duration</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Risk Level</h4>
            <p className="text-2xl font-bold text-red-600">30%</p>
            <p className="text-sm text-gray-600">high-risk scenarios</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Strategic Recommendations</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Develop contingency plans for challenging scenarios</li>
            <li>• Establish clear communication channels with all stakeholders</li>
            <li>• Monitor early warning indicators for negative outcomes</li>
            <li>• Prepare mitigation strategies for high-risk consequences</li>
            <li>• Document decision rationale for future reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OutcomePredictor;