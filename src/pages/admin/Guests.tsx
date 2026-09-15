import React from 'react';

export const Guests: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Guests Management</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500">Guest management table goes here. Features will include adding guests, generating unique guest codes, and importing/exporting CSV.</p>
      </div>
    </div>
  );
};
