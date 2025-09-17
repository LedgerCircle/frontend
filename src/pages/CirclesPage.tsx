import React from 'react';
import { useWallet } from '../hooks/useWallet';
import LendingCircles from '../components/LendingCircles';
import WalletConnection from '../components/WalletConnection';

const CirclesPage: React.FC = () => {
  const { walletState } = useWallet();

  if (!walletState.isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lending Circles</h1>
          <p className="text-lg text-gray-600">
            Connect your wallet to view and join lending circles.
          </p>
        </div>
        
        <WalletConnection />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lending Circles</h1>
        <p className="text-gray-600">
          Join existing circles or create your own to start building your lending network.
        </p>
      </div>

      <LendingCircles userAddress={walletState.address!} />
    </div>
  );
};

export default CirclesPage;