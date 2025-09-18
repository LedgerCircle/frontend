import React, { useState } from 'react';
import { LendingCircle } from '../types';
import { formatXRP, calculateInterest } from '../utils';

interface BorrowRequestFormProps {
  userAddress: string;
  circles: LendingCircle[];
}

const BorrowRequestForm: React.FC<BorrowRequestFormProps> = ({ userAddress, circles }) => {
  const [formData, setFormData] = useState({
    circleId: '',
    amount: '',
    reason: '',
    duration: '30'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter circles where user is a member and can borrow
  const eligibleCircles = circles.filter(circle => {
    const userMember = circle.members.find(m => m.address === userAddress);
    return userMember && !userMember.hasActiveLoan && circle.status === 'active';
  });

  const selectedCircle = circles.find(c => c.id === formData.circleId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.circleId) {
      newErrors.circleId = 'Please select a circle';
    }

    if (!formData.amount) {
      newErrors.amount = 'Please enter an amount';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Please enter a valid amount';
      } else if (selectedCircle) {
        const maxAmount = parseFloat(selectedCircle.totalAmount) * 0.8; // Max 80% of pool
        if (amount > maxAmount) {
          newErrors.amount = `Amount cannot exceed ${formatXRP(maxAmount.toString())}`;
        }
      }
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide a reason for the loan';
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = 'Please provide a more detailed reason (at least 10 characters)';
    }

    if (!formData.duration) {
      newErrors.duration = 'Please select a duration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Loan request submitted:', formData);
      
      // Reset form
      setFormData({
        circleId: '',
        amount: '',
        reason: '',
        duration: '30'
      });
      
      alert('Loan request submitted successfully!');
    } catch (error) {
      console.error('Failed to submit loan request:', error);
      alert('Failed to submit loan request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEstimatedInterest = () => {
    if (!formData.amount || !formData.duration || !selectedCircle) return 0;
    
    const principal = parseFloat(formData.amount);
    const days = parseInt(formData.duration);
    
    return calculateInterest(principal, selectedCircle.interestRate, days);
  };

  if (eligibleCircles.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Loan</h2>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🚫</div>
          <p className="text-gray-500 mb-2">No eligible circles for borrowing</p>
          <p className="text-sm text-gray-400">
            You need to be a member of an active circle with no existing loans to request a loan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Loan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Circle Selection */}
        <div>
          <label htmlFor="circleId" className="block text-sm font-medium text-gray-700 mb-2">
            Select Circle
          </label>
          <select
            id="circleId"
            value={formData.circleId}
            onChange={(e) => setFormData({ ...formData, circleId: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.circleId ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Choose a circle...</option>
            {eligibleCircles.map((circle) => (
              <option key={circle.id} value={circle.id}>
                {circle.name} - {formatXRP(circle.totalAmount)} pool
              </option>
            ))}
          </select>
          {errors.circleId && <p className="mt-1 text-sm text-red-600">{errors.circleId}</p>}
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (XRP)
          </label>
          <input
            type="number"
            id="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount in XRP"
            min="1"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.amount ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          {selectedCircle && (
            <p className="mt-1 text-sm text-gray-500">
              Maximum: {formatXRP((parseFloat(selectedCircle.totalAmount) * 0.8).toString())}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            Loan Duration
          </label>
          <select
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.duration ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
          </select>
          {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Loan
          </label>
          <textarea
            id="reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Please explain why you need this loan..."
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reason ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
          <p className="mt-1 text-sm text-gray-500">
            {formData.reason.length}/500 characters
          </p>
        </div>

        {/* Interest Calculation */}
        {formData.amount && formData.duration && selectedCircle && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Loan Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Principal:</span>
                <span className="font-medium">{formatXRP(formData.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Interest Rate:</span>
                <span className="font-medium">{selectedCircle.interestRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Duration:</span>
                <span className="font-medium">{formData.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Estimated Interest:</span>
                <span className="font-medium">{formatXRP(calculateEstimatedInterest().toFixed(2))}</span>
              </div>
              <div className="border-t border-blue-300 pt-1 flex justify-between font-semibold">
                <span className="text-blue-900">Total Repayment:</span>
                <span>{formatXRP((parseFloat(formData.amount) + calculateEstimatedInterest()).toFixed(2))}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Loan Request'}
        </button>
      </form>
    </div>
  );
};

export default BorrowRequestForm;