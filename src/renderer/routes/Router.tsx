import { useEffect } from 'react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HelloPage from 'renderer/pages/Hello/HelloPage';
import LoginPage from 'renderer/pages/Login/LoginPage';
import { useAuth } from 'renderer/services/context/auth/AuthProvider';
import LoadingPage from 'renderer/pages/Loading/LoadingPage';
import routePath from './route-path';

function RoutesWrapper() {
  const { credential } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (credential === null) {
      navigate(routePath.login);
    } else {
      navigate(routePath.root);
    }
  }, [navigate, credential]);
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
