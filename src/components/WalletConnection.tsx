import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { formatXRP, formatAddress } from '../utils';

const WalletConnection: React.FC = () => {
  const { walletState, connectWallet, disconnectWallet } = useWallet();

  if (walletState.isConnected && walletState.address) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Wallet Connected</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Connected</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <p className="mt-1 text-sm text-gray-900 font-mono">
              {formatAddress(walletState.address)}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Balance</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {walletState.balance ? formatXRP(walletState.balance) : 'Loading...'}
            </p>
          </div>
        </div>
        
        <button
          onClick={disconnectWallet}
          className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
      <p className="text-gray-600 mb-6">
        Connect your XRPL wallet using XUMM to start participating in lending circles.
      </p>
      
      {walletState.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {walletState.error}
        </div>
      )}
      
      <button
        onClick={connectWallet}
        disabled={walletState.isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {walletState.isLoading ? 'Connecting...' : 'Connect with XUMM'}
      </button>
    </div>
  );
};

export default WalletConnection;