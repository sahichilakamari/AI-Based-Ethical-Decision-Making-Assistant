import React, { useState } from 'react';
import { FileText, Users, Clock, Tag, AlertTriangle, Lightbulb } from 'lucide-react';
import { DilemmaData } from '../types/DilemmaTypes';

interface DilemmaInputProps {
  onSubmit: (data: DilemmaData) => void;
}

const DilemmaInput: React.FC<DilemmaInputProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DilemmaData>({
    title: '',
    description: '',
    context: '',
    stakeholders: [],
    values: [],
    constraints: [],
    urgency: 'medium',
    category: ''
  });

  const [stakeholderInput, setStakeholderInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [constraintInput, setConstraintInput] = useState('');

  const categories = [
    'Business Ethics', 'Medical Ethics', 'Environmental Ethics', 'Technology Ethics',
    'Professional Ethics', 'Personal Ethics', 'Legal Ethics', 'Research Ethics'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Can wait weeks/months', color: 'text-green-600 bg-green-50' },
    { value: 'medium', label: 'Medium - Should resolve within days', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'high', label: 'High - Needs resolution within hours', color: 'text-orange-600 bg-orange-50' },
    { value: 'critical', label: 'Critical - Immediate action required', color: 'text-red-600 bg-red-50' }
  ];

  const addStakeholder = () => {
    if (stakeholderInput.trim()) {
      setFormData(prev => ({
        ...prev,
        stakeholders: [...prev.stakeholders, stakeholderInput.trim()]
      }));
      setStakeholderInput('');
    }
  };

  const addValue = () => {
    if (valueInput.trim()) {
      setFormData(prev => ({
        ...prev,
        values: [...prev.values, valueInput.trim()]
      }));
      setValueInput('');
    }
  };

  const addConstraint = () => {
    if (constraintInput.trim()) {
      setFormData(prev => ({
        ...prev,
        constraints: [...prev.constraints, constraintInput.trim()]
      }));
      setConstraintInput('');
    }
  };

  const removeItem = (array: string[], index: number, key: keyof DilemmaData) => {
    setFormData(prev => ({
      ...prev,
      [key]: array.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.category) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.title && formData.description && formData.category;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Describe Your Ethical Dilemma</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Provide detailed information about your situation to receive comprehensive ethical analysis and guidance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dilemma Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Brief title for your ethical dilemma"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Describe the ethical dilemma in detail, including the key decisions you need to make..."
              required
            />
          </div>

          {/* Context */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Context
            </label>
            <textarea
              value={formData.context}
              onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Provide background information, organizational context, cultural considerations, etc."
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Clock className="inline w-4 h-4 mr-1" />
              Urgency Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {urgencyLevels.map(level => (
                <label key={level.value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="urgency"
                    value={level.value}
                    checked={formData.urgency === level.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value as any }))}
                    className="sr-only"
                  />
                  <div className={`p-3 rounded-lg border-2 transition-all ${
                    formData.urgency === level.value
                      ? 'border-primary-500 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full mb-1 ${level.color}`}>
                      {level.value.toUpperCase()}
                    </div>
                    <p className="text-sm text-gray-600">{level.label.split(' - ')[1]}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Dynamic Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stakeholders */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Key Stakeholders
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={stakeholderInput}
                    onChange={(e) => setStakeholderInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStakeholder())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
                    placeholder="Add stakeholder..."
                  />
                  <button
                    type="button"
                    onClick={addStakeholder}
                    className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.stakeholders.map((stakeholder, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {stakeholder}
                      <button
                        type="button"
                        onClick={() => removeItem(formData.stakeholders, index, 'stakeholders')}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Values */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lightbulb className="inline w-4 h-4 mr-1" />
                Core Values at Stake
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addValue())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
                    placeholder="Add value..."
                  />
                  <button
                    type="button"
                    onClick={addValue}
                    className="px-3 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.values.map((value, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm"
                    >
                      {value}
                      <button
                        type="button"
                        onClick={() => removeItem(formData.values, index, 'values')}
                        className="ml-2 text-secondary-600 hover:text-secondary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <AlertTriangle className="inline w-4 h-4 mr-1" />
                Constraints & Limitations
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={constraintInput}
                    onChange={(e) => setConstraintInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addConstraint())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
                    placeholder="Add constraint..."
                  />
                  <button
                    type="button"
                    onClick={addConstraint}
                    className="px-3 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.constraints.map((constraint, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm"
                    >
                      {constraint}
                      <button
                        type="button"
                        onClick={() => removeItem(formData.constraints, index, 'constraints')}
                        className="ml-2 text-accent-600 hover:text-accent-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isFormValid
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Begin Ethical Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DilemmaInput;