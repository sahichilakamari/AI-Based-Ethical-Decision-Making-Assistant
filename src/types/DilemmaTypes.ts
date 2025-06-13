export interface DilemmaData {
  title: string;
  description: string;
  context: string;
  stakeholders: string[];
  values: string[];
  constraints: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  category: string;
}

export interface EthicalFramework {
  name: string;
  description: string;
  analysis: string;
  recommendation: string;
  score: number;
}

export interface Stakeholder {
  name: string;
  relationship: string;
  impact: 'positive' | 'negative' | 'neutral';
  importance: number;
  concerns: string[];
}

export interface Outcome {
  scenario: string;
  probability: number;
  consequences: string[];
  ethicalImplications: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface CaseStudy {
  title: string;
  summary: string;
  category: string;
  outcome: string;
  lessons: string[];
  relevance: number;
}