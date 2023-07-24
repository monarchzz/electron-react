import { useCallback } from 'react';
import { graphql } from 'renderer/gql';
import { Exact, RefreshTokenInput } from 'renderer/gql/graphql';
import { useMutation } from 'urql';

export const refreshTokenMutation = graphql(`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      userId
      token
      refreshToken
    }
  }
`);

const useRefreshToken = () => {
  const [refreshTokenResult, _updateRefreshToken] =
    useMutation(refreshTokenMutation);

  const updateRefreshToken = useCallback(
    (
      variables: Exact<{
        input: RefreshTokenInput;
      }>,
      tenant: string
    ) => {
      _updateRefreshToken(variables, {
        fetchOptions: {
          headers: {
            tenant,
          },
        },
      });
    },
    [_updateRefreshToken]
  );

  return [refreshTokenResult, updateRefreshToken];
};

export default useRefreshToken;
