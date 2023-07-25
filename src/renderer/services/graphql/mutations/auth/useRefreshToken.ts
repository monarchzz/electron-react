import { useCallback } from 'react';
import { graphql } from 'renderer/gql';
import {
  Exact,
  RefreshTokenInput,
  RefreshTokenMutation,
} from 'renderer/gql/graphql';
import { getTenant } from 'renderer/utils/auth';
import { OperationResult, UseMutationState, useMutation } from 'urql';

export const refreshTokenMutation = graphql(`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      userId
      token
      refreshToken
      tenant
    }
  }
`);

const useRefreshToken = () => {
  const [refreshTokenResult, _refreshToken] = useMutation(refreshTokenMutation);

  const refreshToken = useCallback(
    (
      variables: Exact<{
        input: RefreshTokenInput;
      }>
    ) => {
      return _refreshToken(variables, {
        fetchOptions: {
          headers: {
            tenant: getTenant() || '',
          },
        },
      });
    },
    [_refreshToken]
  );

  const result: [
    UseMutationState<
      RefreshTokenMutation,
      Exact<{
        input: RefreshTokenInput;
      }>
    >,
    (
      variables: Exact<{
        input: RefreshTokenInput;
      }>
    ) => Promise<
      OperationResult<
        RefreshTokenMutation,
        Exact<{
          input: RefreshTokenInput;
        }>
      >
    >
  ] = [refreshTokenResult, refreshToken];

  return result;
};

export default useRefreshToken;
