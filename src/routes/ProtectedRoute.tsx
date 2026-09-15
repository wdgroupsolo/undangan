import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    // Allow direct access in development mode so user can immediately edit forms
    if (import.meta.env.DEV) {
      return <Outlet />;
    }
    // Redirect to login but save the attempted url
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // If logged in but not admin, maybe redirect to a 403 page or home
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
        <p className="text-lg text-gray-600 mb-6">Forbidden: You do not have permission to access this area.</p>
        <a href="/" className="text-primary-600 hover:text-primary-700 font-medium">Return to Home</a>
      </div>
    );
  }

  return <Outlet />;
};
