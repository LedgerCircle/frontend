import { useState, useCallback } from 'react';
import { WalletState, Transaction } from '../types';
import { xummService } from '../services/xummService';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    isLoading: false,
    error: null,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const connectWallet = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await xummService.connectWallet();
      
      if (result.success && result.address) {
        const balance = await xummService.getBalance(result.address);
        const txHistory = await xummService.getTransactionHistory(result.address);
        
        setWalletState({
          isConnected: true,
          address: result.address,
          balance,
          isLoading: false,
          error: null,
        });
        
        setTransactions(txHistory);
      } else {
        setWalletState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Failed to connect wallet',
        }));
      }
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    xummService.disconnect();
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      isLoading: false,
      error: null,
    });
    setTransactions([]);
  }, []);

  const refreshBalance = useCallback(async () => {
    if (walletState.address) {
      try {
        const balance = await xummService.getBalance(walletState.address);
        setWalletState(prev => ({ ...prev, balance }));
      } catch (error) {
        console.error('Failed to refresh balance:', error);
      }
    }
  }, [walletState.address]);

  return {
    walletState,
    transactions,
    connectWallet,
    disconnectWallet,
    refreshBalance,
  };
};