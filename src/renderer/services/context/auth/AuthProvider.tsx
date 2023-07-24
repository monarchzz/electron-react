import { ReactNode, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { AuthCredential } from 'renderer/interfaces/AuthCredential';
import LocalStorage from 'renderer/constants/local-storage';
import AuthContext, { IAuthContext } from './AuthContext';

function AuthProvider({ children }: { children: ReactNode }) {
  const [credential, setCredential] = useLocalStorage<AuthCredential | null>({
    key: LocalStorage.user,
    defaultValue: null,
  });

  const login = useCallback(
    async (authCredential: AuthCredential) => {
      setCredential(authCredential);
    },
    [setCredential]
  );

  const logout = useCallback(async () => {
    setCredential(null);
  }, [setCredential]);

  const value = useMemo<IAuthContext>(
    () => ({
      credential,
      login,
      logout,
    }),
    [login, logout, credential]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
