import {
  createClient, dedupExchange, cacheExchange, fetchExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    fetchExchange,
    devtoolsExchange,
  ],
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' },
  //   };
  // },
});

export default client;
