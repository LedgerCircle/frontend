import React from 'react';
import InterestCalculator from '../components/InterestCalculator';

const CalculatorPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interest Calculator</h1>
        <p className="text-gray-600">
          Calculate loan interest and payments to plan your borrowing strategy.
        </p>
      </div>

      <InterestCalculator />
    </div>
  );
};

export default CalculatorPage;