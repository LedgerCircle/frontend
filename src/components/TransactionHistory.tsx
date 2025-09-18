import React from 'react';
import { Transaction } from '../types';
import { formatXRP, formatDate, formatAddress } from '../utils';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'contribution':
        return '🔄';
      case 'loan':
        return '💰';
      case 'repayment':
        return '✅';
      default:
        return '📝';
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'contribution':
        return 'text-blue-600';
      case 'loan':
        return 'text-green-600';
      case 'repayment':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions yet</p>
          <p className="text-sm text-gray-400">Your transaction history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                <div>
                  <h3 className={`font-medium ${getTransactionColor(transaction.type)}`}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    From: {formatAddress(transaction.from)} → To: {formatAddress(transaction.to)}
                  </p>
                  {transaction.circleId && (
                    <p className="text-xs text-gray-500">Circle: {transaction.circleId}</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatXRP(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(transaction.timestamp)}
                </p>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-mono">
                Hash: {transaction.hash}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;