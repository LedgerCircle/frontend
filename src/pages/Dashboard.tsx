import React from 'react';
import { useWallet } from '../hooks/useWallet';
import WalletConnection from '../components/WalletConnection';
import MemberDashboard from '../components/MemberDashboard';
import TransactionHistory from '../components/TransactionHistory';
import { LendingCircle } from '../types';

const Dashboard: React.FC = () => {
  const { walletState, transactions } = useWallet();

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
        },
        {
          address: 'rMember2',
          contributionsMade: 3,
          totalContributed: '1500',
          hasActiveLoan: true,
          joinedAt: new Date('2024-01-02')
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to LedgerLoop</h1>
          <p className="text-lg text-gray-600 mb-6">
            LedgerLoop is a decentralized lending circle platform built on the XRP Ledger. 
            Connect your wallet to get started with peer-to-peer lending and borrowing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WalletConnection />
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Connect Your Wallet</h3>
                  <p className="text-sm text-gray-600">Use XUMM to securely connect your XRPL wallet</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Join or Create Circles</h3>
                  <p className="text-sm text-gray-600">Participate in lending circles with trusted members</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Contribute & Borrow</h3>
                  <p className="text-sm text-gray-600">Make regular contributions and request loans when needed</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Build Trust & History</h3>
                  <p className="text-sm text-gray-600">Establish your lending reputation on the blockchain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your lending circle activities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Wallet & Member Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          <WalletConnection />
          <MemberDashboard userAddress={walletState.address!} circles={userCircles} />
        </div>

        {/* Right Column - Transaction History */}
        <div className="lg:col-span-1">
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;