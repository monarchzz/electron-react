import { createContext } from 'react';
import { AuthCredential } from 'renderer/interfaces/auth-credential';

export interface IAuthContext {
  login: (authCredential: AuthCredential) => Promise<void>;
  logout: () => Promise<void>;
  credential: AuthCredential | null;
  authState: 'loading' | 'authenticated' | 'unauthenticated';
}

const AuthContext = createContext<IAuthContext>({
  login: async () => {},
  logout: async () => {},
  credential: null,
  authState: 'loading',
});

export default AuthContext;
