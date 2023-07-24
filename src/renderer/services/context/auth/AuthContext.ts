import { createContext } from 'react';
import { AuthCredential } from 'renderer/interfaces/AuthCredential';

export interface IAuthContext {
  login: (authCredential: AuthCredential) => Promise<void>;
  logout: () => Promise<void>;
  user: AuthCredential | null;
}

const AuthContext = createContext<IAuthContext>({
  login: async () => {},
  logout: async () => {},
  user: null,
});

export default AuthContext;
