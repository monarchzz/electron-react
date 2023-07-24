import { GraphqlConfig, GraphqlErrorCodes } from 'renderer/constants/graphql';
import {
  getRefreshToken,
  getToken,
  removeAuthCredential,
  setAuthCredential,
} from 'renderer/utils/auth';
import { Client, cacheExchange, fetchExchange } from 'urql';
import { refocusExchange } from '@urql/exchange-refocus';
import { AuthConfig, authExchange } from '@urql/exchange-auth';
import { refreshTokenMutation } from './mutations/auth/useRefreshToken';

const client = new Client({
  url: GraphqlConfig.url,
  exchanges: [
    refocusExchange(),
    cacheExchange,
    authExchange(async (utils) => {
      const token = getToken();
      // const refreshToken = getRefreshToken();
      const autConfig: AuthConfig = {
        addAuthToOperation(operation) {
          if (!token) return operation;
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${token}`,
          });
        },
        didAuthError(error) {
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === GraphqlErrorCodes.authNotAuthorized
          );
        },
        async refreshAuth() {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            removeAuthCredential();
          }

          const result = await utils.mutate(refreshTokenMutation, {
            input: {
              refreshToken: refreshToken!,
            },
          });

          if (result.data?.refreshToken) {
            setAuthCredential(result.data.refreshToken);
          } else {
            removeAuthCredential();
          }
        },
      };
      return autConfig;
    }),
    fetchExchange,
  ],
});

export default client;
