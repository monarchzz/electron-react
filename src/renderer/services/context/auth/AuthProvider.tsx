import { ReactNode, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { AuthCredential } from 'renderer/interfaces/auth-credential';
import LocalStorage from 'renderer/constants/local-storage';
import useGetProfile from 'renderer/services/graphql/queries/profile/useGetProfile';
import AuthContext, { IAuthContext } from './AuthContext';

function AuthProvider({ children }: { children: ReactNode }) {
  const [credential, setCredential] = useLocalStorage<AuthCredential | null>({
    key: LocalStorage.user,
    defaultValue: null,
  });
  const [result, reexecuteQuery] = useGetProfile();
  const { data, fetching } = result;
  const authState = useMemo(() => {
    if (fetching) {
      return 'loading';
    }
    if (data?.profile) {
      return 'authenticated';
    }
    return 'unauthenticated';
  }, [data, fetching]);

  const login = useCallback(
    async (authCredential: AuthCredential) => {
      setCredential(authCredential);
      reexecuteQuery({ requestPolicy: 'network-only' });
    },
    [reexecuteQuery, setCredential]
  );

  const logout = useCallback(async () => {
    setCredential(null);
  }, [setCredential]);

  const value = useMemo<IAuthContext>(
    () => ({
      credential,
      login,
      logout,
      authState,
    }),
    [login, logout, credential, authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
