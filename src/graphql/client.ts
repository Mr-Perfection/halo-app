import {
  createClient, dedupExchange, fetchExchange, errorExchange,
} from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';
import { redirectToLogin } from 'utils/auth';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({}),
    devtoolsExchange,
    errorExchange({
      onError(error) {
        // we only get an auth error here when the
        // auth exchange had attempted to refresh auth
        // and getting an auth error again for the second time
        const isAuthError = error.graphQLErrors.some(
          (e) => e.extensions?.code === 'UNAUTHENTICATED',
        );
        if (isAuthError) {
          redirectToLogin();
        }
      },
    }),
    fetchExchange,
    // All the auth logic is handled by http-only cookies.
    // authExchange({
    //   getAuth: async () => null,
    //   addAuthToOperation: ({
    //     operation,
    //   }) => operation,
    //   didAuthError: ({ error }) => error.graphQLErrors.some(
    //     (e) => e.extensions?.code === 'UNAUTHENTICATED',
    //   ),
    // }),
  ],

  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' },
  //   };
  // },
});

export default client;
