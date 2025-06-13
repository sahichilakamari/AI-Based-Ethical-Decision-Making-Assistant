import React from 'react';
import { BookOpen, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { CaseStudy } from '../types/DilemmaTypes';

const CaseStudies: React.FC = () => {
  const caseStudies: CaseStudy[] = [
    {
      title: 'Corporate Whistleblowing Dilemma',
      summary: 'An employee discovered financial irregularities in their company and faced the decision whether to report internally, to regulators, or remain silent to protect their career.',
      category: 'Business Ethics',
      outcome: 'Employee chose to report through internal channels first, then to regulators when internal action was insufficient. Led to regulatory investigation and corporate reforms.',
      lessons: [
        'Graduated disclosure can balance loyalty with public interest',
        'Legal protections for whistleblowers are crucial but not always sufficient',
        'Ethical courage often requires personal sacrifice',
        'Organizations benefit from strong internal reporting mechanisms'
      ],
      relevance: 9.2
    },
    {
      title: 'Medical Resource Allocation During Crisis',
      summary: 'Hospital administrators had to allocate limited ventilators during a pandemic peak, choosing between patients with different survival probabilities and life circumstances.',
      category: 'Medical Ethics',
      outcome: 'Adopted a protocol based primarily on clinical factors and short-term survivability, with ethics committee oversight for complex cases.',
      lessons: [
        'Clear, pre-established criteria help in crisis decision-making',
        'Clinical considerations should take precedence over social factors',
        'Transparency in decision-making processes builds public trust',
        'Regular ethical review prevents bias in high-pressure situations'
      ],
      relevance: 8.8
    },
    {
      title: 'AI Bias in Hiring Algorithms',
      summary: 'A tech company discovered their AI hiring tool was systematically discriminating against certain demographic groups, despite being designed to promote fairness.',
      category: 'Technology Ethics',
      outcome: 'Company suspended the tool, conducted comprehensive bias audit, redesigned the algorithm with diverse input, and implemented ongoing monitoring.',
      lessons: [
        'AI systems can perpetuate historical biases in unexpected ways',
        'Diverse teams are essential for identifying algorithmic bias',
        'Transparency and regular auditing are crucial for AI fairness',
        'Short-term costs of addressing bias prevent long-term harm'
      ],
      relevance: 8.5
    },
    {
      title: 'Environmental vs. Economic Development',
      summary: 'A community faced a choice between approving a factory that would bring jobs but potentially damage local ecosystems and water quality.',
      category: 'Environmental Ethics',
      outcome: 'Community negotiated for enhanced environmental protections, monitoring systems, and a community fund before approving modified development plans.',
      lessons: [
        'Stakeholder engagement can lead to creative compromise solutions',
        'Environmental protection and economic development can coexist with proper planning',
        'Community ownership of decisions increases acceptance',
        'Long-term thinking benefits both economy and environment'
      ],
      relevance: 7.9
    },
    {
      title: 'Research Data Sharing vs. Privacy',
      summary: 'Researchers with potentially life-saving medical data faced pressure to share it widely, but the data contained sensitive personal information that could be re-identified.',
      category: 'Research Ethics',
      outcome: 'Developed advanced anonymization techniques, established secure data sharing protocols, and created tiered access based on research purpose and security capabilities.',
      lessons: [
        'Technical solutions can often resolve ethical tensions',
        'Collaboration between ethicists and technologists is essential',
        'Privacy protection and scientific progress are not mutually exclusive',
        'Clear governance frameworks enable responsible innovation'
      ],
      relevance: 8.3
    },
    {
      title: 'Professional Loyalty vs. Client Interest',
      summary: 'A lawyer discovered that their law firm was overcharging clients and providing subpar representation due to profit pressures.',
      category: 'Legal Ethics',
      outcome: 'Lawyer attempted internal resolution, then reported to the state bar when internal efforts failed. Led to firm reforms and disciplinary actions.',
      lessons: [
        'Professional duties to clients supersede firm loyalty',
        'Ethical obligations often require difficult personal choices',
        'Professional regulatory bodies serve important oversight functions',
        'Systemic problems require systemic solutions'
      ],
      relevance: 8.1
    }
  ];

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 9) return 'text-green-600 bg-green-50';
    if (relevance >= 8) return 'text-blue-600 bg-blue-50';
    if (relevance >= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Business Ethics': return <TrendingUp className="w-5 h-5" />;
      case 'Medical Ethics': return <CheckCircle className="w-5 h-5" />;
      case 'Technology Ethics': return <AlertTriangle className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Case Studies</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Learn from real-world ethical dilemmas and their outcomes to inform your decision-making process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {caseStudies.map((caseStudy, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                  {getCategoryIcon(caseStudy.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{caseStudy.title}</h3>
                  <span className="text-sm text-gray-600 font-medium">{caseStudy.category}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRelevanceColor(caseStudy.relevance)}`}>
                {caseStudy.relevance}/10
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Situation</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{caseStudy.summary}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Outcome</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{caseStudy.outcome}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Lessons</h4>
                <ul className="space-y-1">
                  {caseStudy.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="flex items-start text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-6 border border-secondary-200">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Learn from Experience</h3>
          <p className="text-gray-600 mb-4">
            These case studies demonstrate that ethical dilemmas rarely have perfect solutions, but thoughtful analysis and stakeholder consideration lead to better outcomes.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
              <span>Evidence-based decisions</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
              <span>Stakeholder engagement</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-yellow-600" />
              <span>Continuous monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;