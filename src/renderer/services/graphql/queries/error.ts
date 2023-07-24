import { CombinedError } from 'urql';

function getGraphQLError(error: CombinedError | undefined) {
  return error?.graphQLErrors.map((e) => ({
    message: e.message,
    code: e.extensions.code,
  }));
}

function errorExists(
  error: CombinedError | undefined,
  code: string | undefined
) {
  return getGraphQLError(error)?.some((e) => e.code === code);
}

export { getGraphQLError, errorExists };
