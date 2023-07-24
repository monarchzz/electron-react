import { useCallback } from 'react';
import { graphql } from 'renderer/gql';
import { Exact, LoginInput } from 'renderer/gql/graphql';
import { useMutation } from 'urql';

export const loginMutation = graphql(`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      userId
      token
      refreshToken
    }
  }
`);

const useLogin = () => {
  const [loginResult, _updateLogin] = useMutation(loginMutation);

  const updateLogin = useCallback(
    (
      variables: Exact<{
        input: LoginInput;
      }>,
      tenant: string
    ) => {
      _updateLogin(variables, {
        fetchOptions: {
          headers: {
            tenant,
          },
        },
      });
    },
    [_updateLogin]
  );

  return [loginResult, updateLogin];
};

export default useLogin;
