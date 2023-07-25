import { useCallback } from 'react';
import { graphql } from 'renderer/gql';
import { Exact, LoginInput, LoginMutation } from 'renderer/gql/graphql';
import { OperationResult, UseMutationState, useMutation } from 'urql';

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

  const result: [
    UseMutationState<
      LoginMutation,
      Exact<{
        input: LoginInput;
      }>
    >,
    (
      variables: Exact<{ input: LoginInput }>,
      tenant: string
    ) => Promise<OperationResult<LoginMutation, Exact<{ input: LoginInput }>>>
  ] = [loginResult, login];

  return result;
};

export default useLogin;
