import Graphql from 'renderer/constants/graphql';
import { getToken } from 'renderer/utils/auth';
import { Client, cacheExchange, fetchExchange } from 'urql';

const client = new Client({
  url: Graphql.url,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = getToken();
    console.log('GRAPHQL_URL', process.env.GRAPHQL_URL);
    console.log('token', token);
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

export default client;
