export interface User {
  address: string;
  balance: string;
  name?: string;
  isConnected: boolean;
}

export interface LendingCircle {
  id: string;
  name: string;
  description: string;
  totalAmount: string;
  contributionAmount: string;
  duration: number; // in days
  members: Member[];
  status: 'active' | 'completed' | 'pending';
  createdAt: Date;
  interestRate: number;
}

export interface Member {
  address: string;
  name?: string;
  contributionsMade: number;
  totalContributed: string;
  hasActiveLoan: boolean;
  joinedAt: Date;
}

export interface BorrowRequest {
  id: string;
  borrowerAddress: string;
  amount: string;
  reason: string;
  requestedAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'repaid';
  circleId: string;
}

export interface Transaction {
  id: string;
  hash: string;
  type: 'contribution' | 'loan' | 'repayment';
  amount: string;
  from: string;
  to: string;
  timestamp: Date;
  circleId?: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}