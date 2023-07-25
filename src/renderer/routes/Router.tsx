import { useEffect } from 'react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HelloPage from 'renderer/pages/Hello/HelloPage';
import LoginPage from 'renderer/pages/Login/LoginPage';
import { useAuth } from 'renderer/services/context/auth/AuthProvider';
import LoadingPage from 'renderer/pages/Loading/LoadingPage';
import routePath from './route-path';

function RoutesWrapper() {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    switch (authState) {
      case 'loading':
        navigate(routePath.loading);
        break;
      case 'authenticated':
        navigate(routePath.root);
        break;
      case 'unauthenticated':
        navigate(routePath.login);
        break;
      default:
        break;
    }
  }, [navigate, authState]);
  return (
    <Routes>
      <Route path="/" element={<HelloPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loading" element={<LoadingPage />} />
    </Routes>
  );
}

function Router() {
  return (
    <MemoryRouter>
      <RoutesWrapper />
    </MemoryRouter>
  );
}

export default Router;
