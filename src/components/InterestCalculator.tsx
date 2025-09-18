import React, { useState, useEffect, useCallback } from 'react';
import { formatXRP, calculateInterest } from '../utils';

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('1000');
  const [interestRate, setInterestRate] = useState<string>('5');
  const [duration, setDuration] = useState<string>('90');
  const [calculationType, setCalculationType] = useState<'simple' | 'compound'>('simple');

  const [results, setResults] = useState({
    interest: 0,
    totalAmount: 0,
    monthlyPayment: 0
  });

  const calculateResults = useCallback(() => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(interestRate) || 0;
    const d = parseInt(duration) || 0;

    if (p <= 0 || r < 0 || d <= 0) {
      setResults({ interest: 0, totalAmount: 0, monthlyPayment: 0 });
      return;
    }

    let interest: number;

    if (calculationType === 'simple') {
      interest = calculateInterest(p, r, d);
    } else {
      // Compound interest (monthly compounding for demo)
      const monthlyRate = r / 100 / 12;
      const months = d / 30;
      const compoundAmount = p * Math.pow(1 + monthlyRate, months);
      interest = compoundAmount - p;
    }

    const totalAmount = p + interest;
    const monthlyPayment = totalAmount / (d / 30);

    setResults({
      interest: Math.max(0, interest),
      totalAmount,
      monthlyPayment
    });
  }, [principal, interestRate, duration, calculationType]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const presetScenarios = [
    { name: 'Small Business Loan', principal: '5000', rate: '7', duration: '120' },
    { name: 'Emergency Fund', principal: '1000', rate: '5', duration: '60' },
    { name: 'Home Improvement', principal: '3000', rate: '6', duration: '90' },
    { name: 'Education Expense', principal: '2000', rate: '4', duration: '180' }
  ];

  const applyPreset = (preset: typeof presetScenarios[0]) => {
    setPrincipal(preset.principal);
    setInterestRate(preset.rate);
    setDuration(preset.duration);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Interest Calculator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-2">
              Principal Amount (XRP)
            </label>
            <input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration (days)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="simple"
                  checked={calculationType === 'simple'}
                  onChange={(e) => setCalculationType(e.target.value as 'simple')}
                  className="mr-2"
                />
                <span className="text-sm">Simple Interest</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="compound"
                  checked={calculationType === 'compound'}
                  onChange={(e) => setCalculationType(e.target.value as 'compound')}
                  className="mr-2"
                />
                <span className="text-sm">Compound Interest (Monthly)</span>
              </label>
            </div>
          </div>

          {/* Preset Scenarios */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetScenarios.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="text-xs px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Calculation Results</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-sm font-medium text-gray-700">Principal Amount:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatXRP(principal || '0')}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-sm font-medium text-gray-700">Interest Earned:</span>
                <span className="text-lg font-semibold text-green-600">
                  {formatXRP(results.interest.toFixed(2))}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-md border-2 border-blue-300">
                <span className="text-sm font-medium text-blue-700">Total Amount:</span>
                <span className="text-xl font-bold text-blue-900">
                  {formatXRP(results.totalAmount.toFixed(2))}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-sm font-medium text-gray-700">Monthly Payment:</span>
                <span className="text-lg font-semibold text-orange-600">
                  {formatXRP(results.monthlyPayment.toFixed(2))}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Calculation Details</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>Interest Type:</strong> {calculationType === 'simple' ? 'Simple' : 'Compound (Monthly)'}</p>
              <p><strong>Duration:</strong> {duration} days ({(parseInt(duration) / 30).toFixed(1)} months)</p>
              <p><strong>Daily Rate:</strong> {((parseFloat(interestRate) || 0) / 365).toFixed(4)}%</p>
              {calculationType === 'simple' ? (
                <p><strong>Formula:</strong> Interest = Principal × Rate × Time</p>
              ) : (
                <p><strong>Formula:</strong> A = P(1 + r/n)^(nt)</p>
              )}
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Interest Comparison</h4>
            <div className="space-y-2 text-sm">
              {[30, 60, 90, 120, 180].map((days) => {
                const interest = calculationType === 'simple' 
                  ? calculateInterest(parseFloat(principal) || 0, parseFloat(interestRate) || 0, days)
                  : (() => {
                      const p = parseFloat(principal) || 0;
                      const r = parseFloat(interestRate) || 0;
                      const monthlyRate = r / 100 / 12;
                      const months = days / 30;
                      return p * Math.pow(1 + monthlyRate, months) - p;
                    })();
                
                return (
                  <div key={days} className="flex justify-between">
                    <span className="text-gray-600">{days} days:</span>
                    <span className="font-medium">{formatXRP(interest.toFixed(2))}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;