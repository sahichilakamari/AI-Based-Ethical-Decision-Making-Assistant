import React from 'react';
import { Brain, CheckCircle, AlertCircle, Lightbulb, Download, Star } from 'lucide-react';
import { DilemmaData } from '../types/DilemmaTypes';

interface RecommendationEngineProps {
  dilemma: DilemmaData;
}

const RecommendationEngine: React.FC<RecommendationEngineProps> = ({ dilemma }) => {
  // Generate comprehensive recommendation based on all previous analyses
  const generateRecommendation = () => {
    const urgencyWeight = {
      'critical': 0.4,
      'high': 0.3,
      'medium': 0.2,
      'low': 0.1
    };

    const categoryGuidance = {
      'Business Ethics': {
        primary: 'Balance stakeholder interests with long-term sustainability',
        framework: 'Utilitarian with stakeholder theory considerations',
        keyPrinciples: ['Transparency', 'Accountability', 'Stakeholder Value', 'Sustainable Growth']
      },
      'Medical Ethics': {
        primary: 'Prioritize patient welfare while respecting autonomy',
        framework: 'Principlist approach with care ethics elements',
        keyPrinciples: ['Beneficence', 'Non-maleficence', 'Autonomy', 'Justice']
      },
      'Environmental Ethics': {
        primary: 'Consider long-term environmental and social sustainability',
        framework: 'Consequentialist with intergenerational justice',
        keyPrinciples: ['Sustainability', 'Stewardship', 'Future Generations', 'Ecological Integrity']
      },
      'Technology Ethics': {
        primary: 'Ensure technology serves human flourishing',
        framework: 'Human-centered design with rights-based approach',
        keyPrinciples: ['Privacy', 'Fairness', 'Transparency', 'Human Agency']
      },
      'Professional Ethics': {
        primary: 'Uphold professional standards while serving client interests',
        framework: 'Deontological with professional virtue ethics',
        keyPrinciples: ['Competence', 'Integrity', 'Confidentiality', 'Professional Responsibility']
      },
      'Personal Ethics': {
        primary: 'Align actions with core values and maintain relationships',
        framework: 'Virtue ethics with care ethics considerations',
        keyPrinciples: ['Authenticity', 'Compassion', 'Personal Growth', 'Relationship Harmony']
      },
      'Legal Ethics': {
        primary: 'Serve justice while advocating for client interests',
        framework: 'Rule-based with justice and fairness emphasis',
        keyPrinciples: ['Justice', 'Client Advocacy', 'Legal System Integrity', 'Public Service']
      },
      'Research Ethics': {
        primary: 'Advance knowledge while protecting participants',
        framework: 'Consequentialist with strong deontological constraints',
        keyPrinciples: ['Scientific Integrity', 'Participant Protection', 'Knowledge Advancement', 'Social Benefit']
      }
    };

    const guidance = categoryGuidance[dilemma.category as keyof typeof categoryGuidance] || categoryGuidance['Personal Ethics'];

    return {
      primaryRecommendation: guidance.primary,
      recommendedFramework: guidance.framework,
      keyPrinciples: guidance.keyPrinciples,
      urgencyFactor: urgencyWeight[dilemma.urgency],
      confidenceScore: 8.7,
      implementationSteps: generateImplementationSteps(dilemma, guidance),
      riskMitigation: generateRiskMitigation(dilemma),
      successMetrics: generateSuccessMetrics(dilemma)
    };
  };

  const generateImplementationSteps = (dilemma: DilemmaData, guidance: any) => {
    const baseSteps = [
      {
        step: 1,
        title: 'Stakeholder Communication',
        description: 'Communicate your decision rationale transparently to all affected parties',
        timeline: dilemma.urgency === 'critical' ? 'Immediate' : 'Within 24-48 hours',
        priority: 'High'
      },
      {
        step: 2,
        title: 'Implementation Planning',
        description: 'Develop detailed action plan with clear responsibilities and timelines',
        timeline: dilemma.urgency === 'critical' ? '1-2 days' : '3-7 days',
        priority: 'High'
      },
      {
        step: 3,
        title: 'Monitor Progress',
        description: 'Establish monitoring systems to track implementation and stakeholder reactions',
        timeline: 'Ongoing',
        priority: 'Medium'
      },
      {
        step: 4,
        title: 'Evaluate Outcomes',
        description: 'Assess results against ethical principles and stakeholder impact',
        timeline: '30-90 days',
        priority: 'Medium'
      },
      {
        step: 5,
        title: 'Document Lessons',
        description: 'Record insights and lessons learned for future ethical decision-making',
        timeline: 'Post-completion',
        priority: 'Low'
      }
    ];

    return baseSteps;
  };

  const generateRiskMitigation = (dilemma: DilemmaData) => {
    return [
      {
        risk: 'Stakeholder Resistance',
        mitigation: 'Engage in early consultation and transparent communication',
        probability: 'Medium'
      },
      {
        risk: 'Unintended Consequences',
        mitigation: 'Implement phased approach with regular review points',
        probability: 'Low'
      },
      {
        risk: 'Value Conflicts',
        mitigation: 'Maintain clear priority hierarchy of core values',
        probability: 'Medium'
      },
      {
        risk: 'Implementation Challenges',
        mitigation: 'Develop contingency plans and resource allocation strategies',
        probability: 'High'
      }
    ];
  };

  const generateSuccessMetrics = (dilemma: DilemmaData) => {
    return [
      'Stakeholder satisfaction levels',
      'Alignment with stated ethical values',
      'Long-term relationship quality',
      'Precedent value for future decisions',
      'Resource efficiency in implementation',
      'Public trust and reputation impact'
    ];
  };

  const recommendation = generateRecommendation();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (probability: string) => {
    switch (probability) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const exportDecisionSummary = () => {
    const summary = {
      dilemma: dilemma.title,
      category: dilemma.category,
      recommendation: recommendation.primaryRecommendation,
      framework: recommendation.recommendedFramework,
      principles: recommendation.keyPrinciples,
      implementationSteps: recommendation.implementationSteps,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ethical-decision-${dilemma.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <Brain className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ethical Decision Recommendation</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Based on comprehensive analysis across multiple ethical frameworks and stakeholder considerations.
        </p>
      </div>

      {/* Main Recommendation */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-8 border border-primary-200">
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Primary Recommendation</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">{recommendation.primaryRecommendation}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 mr-2">Confidence Score:</span>
                <span className="text-xl font-bold text-primary-600">{recommendation.confidenceScore}/10</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 mr-2">Framework:</span>
                <span className="text-sm text-secondary-700 font-medium">{recommendation.recommendedFramework}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Guiding Principles</h4>
          <div className="flex flex-wrap gap-2">
            {recommendation.keyPrinciples.map((principle, index) => (
              <span key={index} className="px-4 py-2 bg-white border border-primary-200 rounded-full text-sm font-medium text-primary-800 shadow-sm">
                {principle}
              </span>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="text-center">
          <button
            onClick={exportDecisionSummary}
            className="inline-flex items-center px-6 py-3 bg-white border border-primary-300 rounded-lg text-primary-700 font-medium hover:bg-primary-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Decision Summary
          </button>
        </div>
      </div>

      {/* Implementation Plan */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          Implementation Roadmap
        </h3>
        <div className="space-y-4">
          {recommendation.implementationSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full font-bold text-sm">
                {step.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(step.priority)}`}>
                      {step.priority}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{step.timeline}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Mitigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            Risk Mitigation Strategies
          </h3>
          <div className="space-y-4">
            {recommendation.riskMitigation.map((risk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{risk.risk}</h4>
                  <span className={`text-sm font-medium ${getRiskColor(risk.probability)}`}>
                    {risk.probability} Risk
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{risk.mitigation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Success Metrics
          </h3>
          <div className="space-y-3">
            {recommendation.successMetrics.map((metric, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{metric}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Monitoring Recommendation</h4>
            <p className="text-yellow-800 text-sm">
              Establish regular review checkpoints to assess progress against these metrics and adjust implementation as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;