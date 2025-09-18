import React from 'react';
import { useWallet } from '../hooks/useWallet';
import BorrowRequestForm from '../components/BorrowRequestForm';
import WalletConnection from '../components/WalletConnection';
import { LendingCircle } from '../types';

const BorrowPage: React.FC = () => {
  const { walletState } = useWallet();

  // Mock user circles for demo
  const userCircles: LendingCircle[] = walletState.isConnected ? [
    {
      id: 'circle-1',
      name: 'Tech Workers Circle',
      description: 'A lending circle for technology professionals',
      totalAmount: '5000',
      contributionAmount: '500',
      duration: 90,
      members: [
        {
          address: walletState.address!,
          name: 'You',
          contributionsMade: 2,
          totalContributed: '1000',
          hasActiveLoan: false,
          joinedAt: new Date('2024-01-01')
        }
      ],
      status: 'active',
      createdAt: new Date('2024-01-01'),
      interestRate: 5
    }
  ] : [];

  if (!walletState.isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request a Loan</h1>
          <p className="text-lg text-gray-600">
            Connect your wallet to request loans from your lending circles.
          </p>
        </div>
        
        <WalletConnection />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Loan</h1>
        <p className="text-gray-600">
          Submit a loan request to one of your active lending circles.
        </p>
      </div>

      <BorrowRequestForm userAddress={walletState.address!} circles={userCircles} />
    </div>
  );
};

export default BorrowPage;