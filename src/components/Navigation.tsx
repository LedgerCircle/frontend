import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { formatAddress } from '../utils';

const Navigation: React.FC = () => {
  const { walletState } = useWallet();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/circles', label: 'Circles', icon: '🔗' },
    { path: '/borrow', label: 'Borrow', icon: '💰' },
    { path: '/calculator', label: 'Calculator', icon: '🧮' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                🔗 LedgerLoop
              </div>
            </div>

            {/* Navigation Links */}
            <div className="ml-10 flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Wallet Status */}
          <div className="flex items-center">
            {walletState.isConnected && walletState.address ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatAddress(walletState.address)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {walletState.balance ? `${walletState.balance} XRP` : 'Loading...'}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="ml-1 text-xs text-gray-500">Connected</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Not Connected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;