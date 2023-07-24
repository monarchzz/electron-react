import { ReactNode, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { AuthCredential } from 'renderer/interfaces/AuthCredential';
import LocalStorage from 'renderer/constants/local-storage';
import AuthContext, { IAuthContext } from './AuthContext';

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<AuthCredential | null>({
    key: LocalStorage.user,
    defaultValue: null,
  });

  const login = useCallback(
    async (authCredential: AuthCredential) => {
      setUser(authCredential);
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    setUser(null);
  }, [setUser]);

  const value = useMemo<IAuthContext>(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
