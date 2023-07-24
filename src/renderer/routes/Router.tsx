import { useEffect } from 'react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HelloPage from 'renderer/pages/Hello/HelloPage';
import LoginPage from 'renderer/pages/Login/LoginPage';
import { useAuth } from 'renderer/services/context/auth/AuthProvider';
import routePath from './route-path';

function RoutesWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate(routePath.login);
    }
  }, [navigate, user]);
  return (
    <Routes>
      <Route path="/" element={<HelloPage />} />
      <Route path="/login" element={<LoginPage />} />
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
