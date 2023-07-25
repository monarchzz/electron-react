import LocalStorage from 'renderer/constants/local-storage';
import { AuthCredential } from 'renderer/interfaces/auth-credential';

const getAuthCredential = (): AuthCredential | null => {
  const authCredentialJson = localStorage.getItem(LocalStorage.user);
  if (!authCredentialJson) return null;

  const authCredential = JSON.parse(authCredentialJson) as AuthCredential;

  return authCredential;
};

const getToken = (): string | null => {
  const authCredential = getAuthCredential();
  if (!authCredential) return null;

  return authCredential.token;
};

const getRefreshToken = (): string | null => {
  const authCredential = getAuthCredential();
  if (!authCredential) return null;

  return authCredential.refreshToken;
};

const getTenant = (): string | null => {
  const authCredential = getAuthCredential();
  if (!authCredential) return null;

  return authCredential.tenant;
};

const removeAuthCredential = (): void => {
  localStorage.removeItem(LocalStorage.user);
};

const setAuthCredential = (authCredential: AuthCredential): void => {
  localStorage.setItem(LocalStorage.user, JSON.stringify(authCredential));
};

export {
  getToken,
  getRefreshToken,
  getTenant,
  getAuthCredential,
  removeAuthCredential,
  setAuthCredential,
};
