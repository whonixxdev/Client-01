import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PanitiaRoute: React.FC = () => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-sm font-semibold">Memuat...</div>
      </div>
    );
  }

  const storedToken = token || localStorage.getItem('auth_token');
  const storedRole = user?.role || localStorage.getItem('user_role');

  if (!storedToken || (storedRole !== 'panitia' && storedRole !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const SiswaRoute: React.FC = () => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-sm font-semibold">Memuat...</div>
      </div>
    );
  }

  const storedToken = token || localStorage.getItem('auth_token');
  const storedRole = user?.role || localStorage.getItem('user_role');

  if (!storedToken || storedRole !== 'siswa') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PanitiaRoute;