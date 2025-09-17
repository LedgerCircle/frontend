import React from 'react';
import { LendingCircle } from '../types';
import { formatXRP, formatDate } from '../utils';

interface MemberDashboardProps {
  userAddress: string;
  circles: LendingCircle[];
}

const MemberDashboard: React.FC<MemberDashboardProps> = ({ userAddress, circles }) => {
  // Calculate user's total stats across all circles
  const userStats = circles.reduce(
    (stats, circle) => {
      const userMember = circle.members.find(m => m.address === userAddress);
      if (userMember) {
        stats.totalContributed += parseFloat(userMember.totalContributed);
        stats.contributionsMade += userMember.contributionsMade;
        if (userMember.hasActiveLoan) {
          stats.activeLoans += 1;
        }
      }
      return stats;
    },
    { totalContributed: 0, contributionsMade: 0, activeLoans: 0 }
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Member Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-500 text-white">
                💰
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-800">Total Contributed</p>
              <p className="text-2xl font-semibold text-blue-900">
                {formatXRP(userStats.totalContributed.toString())}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white">
                🔄
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-800">Contributions Made</p>
              <p className="text-2xl font-semibold text-green-900">
                {userStats.contributionsMade}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-yellow-500 text-white">
                📋
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-800">Active Loans</p>
              <p className="text-2xl font-semibold text-yellow-900">
                {userStats.activeLoans}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Circle Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Circle Memberships</h3>
        
        {circles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You're not a member of any circles yet</p>
            <p className="text-sm text-gray-400">Join a circle to start building your lending history</p>
          </div>
        ) : (
          <div className="space-y-6">
            {circles.map((circle) => {
              const userMember = circle.members.find(m => m.address === userAddress);
              
              if (!userMember) return null;

              return (
                <div key={circle.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{circle.name}</h4>
                      <p className="text-sm text-gray-600">{circle.description}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      circle.status === 'active' ? 'bg-green-100 text-green-800' :
                      circle.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {circle.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Your Contributions</p>
                      <p className="font-semibold">{userMember.contributionsMade} payments</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount Contributed</p>
                      <p className="font-semibold">{formatXRP(userMember.totalContributed)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loan Status</p>
                      <p className={`font-semibold ${userMember.hasActiveLoan ? 'text-yellow-600' : 'text-green-600'}`}>
                        {userMember.hasActiveLoan ? 'Active Loan' : 'No Active Loan'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-semibold">{formatDate(userMember.joinedAt)}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Circle Overview</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Total Pool:</span>
                        <span className="ml-2 font-medium">{formatXRP(circle.totalAmount)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Members:</span>
                        <span className="ml-2 font-medium">{circle.members.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-2 font-medium">{circle.duration} days</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Interest Rate:</span>
                        <span className="ml-2 font-medium">{circle.interestRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;