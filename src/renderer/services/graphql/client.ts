import { GraphqlConfig, GraphqlErrorCodes } from 'renderer/constants/graphql';
import {
  getRefreshToken,
  getTenant,
  getToken,
  removeAuthCredential,
  setAuthCredential,
} from 'renderer/utils/auth';
import { Client, cacheExchange, fetchExchange } from 'urql';
import { refocusExchange } from '@urql/exchange-refocus';
import { AuthConfig, AuthUtilities, authExchange } from '@urql/exchange-auth';
import { retryExchange } from '@urql/exchange-retry';
import { refreshTokenMutation } from './mutations/auth/useRefreshToken';

const client = new Client({
  url: GraphqlConfig.url,
  exchanges: [
    refocusExchange(),
    cacheExchange,
    authExchange(async (utils: AuthUtilities) => {
      const autConfig: AuthConfig = {
        addAuthToOperation(operation) {
          const token = getToken();

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

          const result = await utils.mutate(
            refreshTokenMutation,
            {
              input: {
                refreshToken: refreshToken!,
              },
            },
            {
              fetchOptions: {
                headers: {
                  tenant: getTenant() || '',
                },
              },
            }
          );

          if (result.data?.refreshToken) {
            setAuthCredential(result.data.refreshToken);
          } else {
            removeAuthCredential();
          }
        },
      };
      return autConfig;
    }),
    retryExchange({
      initialDelayMs: GraphqlConfig.initialDelayMs,
      maxDelayMs: GraphqlConfig.maxDelayMs,
      randomDelay: true,
      maxNumberAttempts: 2,
      retryIf: (err) => !!(err && err.networkError),
    }),
    fetchExchange,
  ],
});

export default client;
