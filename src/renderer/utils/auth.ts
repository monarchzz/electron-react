import LocalStorage from 'renderer/constants/local-storage';
import { AuthCredential } from 'renderer/interfaces/AuthCredential';

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

export { getToken, getRefreshToken, getAuthCredential };
