import { createClient } from 'urql';
// import cache from './cache';

const client = createClient({
  url: 'http://localhost:4001/graphql',
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' },
  //   };
  // },
});

export default client;
