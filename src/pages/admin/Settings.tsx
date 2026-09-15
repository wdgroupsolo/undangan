import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500">Global site settings, logo, social media links, and default configurations go here.</p>
      </div>
    </div>
  );
};
