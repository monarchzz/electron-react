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
      tenant
    }
  }
`);

const useLogin = () => {
  const [loginResult, _login] = useMutation(loginMutation);

  const login = useCallback(
    (
      variables: Exact<{
        input: LoginInput;
      }>,
      tenant: string
    ) => {
      return _login(variables, {
        fetchOptions: {
          headers: {
            tenant,
          },
        },
      });
    },
    [_login]
  );

  return { loginResult, login };
};

export default useLogin;
