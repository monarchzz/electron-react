const GraphqlConfig = {
  url: 'http://localhost:5233/graphql/',
  initialDelayMs: 5000,
  maxDelayMs: 15000,
};

const GraphqlErrorCodes = {
  authNotAuthorized: 'AUTH_NOT_AUTHORIZED',

  // Authentication
  invalidCredentials: 'Authentication.InvalidCredentials',
};

export { GraphqlConfig, GraphqlErrorCodes };
