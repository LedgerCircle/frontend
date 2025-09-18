import React, { useState } from 'react';
import { LendingCircle } from '../types';
import { formatXRP, formatDate } from '../utils';

interface LendingCirclesProps {
  userAddress: string;
}

const LendingCircles: React.FC<LendingCirclesProps> = ({ userAddress }) => {
  const [activeTab, setActiveTab] = useState<'joined' | 'available'>('joined');
  
  // Mock data for demo
  const joinedCircles: LendingCircle[] = [
    {
      id: 'circle-1',
      name: 'Tech Workers Circle',
      description: 'A lending circle for technology professionals',
      totalAmount: '5000',
      contributionAmount: '500',
      duration: 90,
      members: [
        {
          address: userAddress,
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
  ];

  const availableCircles: LendingCircle[] = [
    {
      id: 'circle-2',
      name: 'Small Business Circle',
      description: 'Supporting small business owners with micro-loans',
      totalAmount: '10000',
      contributionAmount: '1000',
      duration: 120,
      members: [],
      status: 'pending',
      createdAt: new Date('2024-01-15'),
      interestRate: 7
    },
    {
      id: 'circle-3',
      name: 'Community Circle',
      description: 'General community lending circle',
      totalAmount: '3000',
      contributionAmount: '300',
      duration: 60,
      members: [],
      status: 'pending',
      createdAt: new Date('2024-01-20'),
      interestRate: 4
    }
  ];

  const handleJoinCircle = (circleId: string) => {
    console.log(`Joining circle: ${circleId}`);
    // In a real app, this would make an API call
  };

  const renderCircleCard = (circle: LendingCircle, showJoinButton = false) => (
    <div key={circle.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{circle.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{circle.description}</p>
        </div>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          circle.status === 'active' ? 'bg-green-100 text-green-800' :
          circle.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {circle.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Total Pool</p>
          <p className="font-semibold">{formatXRP(circle.totalAmount)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Contribution</p>
          <p className="font-semibold">{formatXRP(circle.contributionAmount)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-semibold">{circle.duration} days</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Interest Rate</p>
          <p className="font-semibold">{circle.interestRate}%</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Members: {circle.members.length}</p>
        <p className="text-xs text-gray-400">Created: {formatDate(circle.createdAt)}</p>
      </div>

      {showJoinButton && (
        <button
          onClick={() => handleJoinCircle(circle.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Join Circle
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Lending Circles</h2>
      
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('joined')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'joined'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Circles ({joinedCircles.length})
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'available'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Available ({availableCircles.length})
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'joined' ? (
          joinedCircles.length > 0 ? (
            joinedCircles.map(circle => renderCircleCard(circle))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't joined any circles yet</p>
              <button
                onClick={() => setActiveTab('available')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Browse available circles
              </button>
            </div>
          )
        ) : (
          availableCircles.length > 0 ? (
            availableCircles.map(circle => renderCircleCard(circle, true))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No circles available at the moment</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LendingCircles;