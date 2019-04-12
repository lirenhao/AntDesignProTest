import ApolloClient from 'apollo-boost';
import fetch from 'dva/fetch';

// TODO 客户端配置、错误处理
// [配置说明文档](https://www.apollographql.com/docs/react/essentials/get-started#configuration)
const client = new ApolloClient({
  uri: '/api/graphql',
  request: operation => {
    console.log('client-request', operation);
  },
  onError: error => {
    console.log('client-error', error);
  },
  fetch,
  headers: {},
});

export default {
  query: (query, variables) =>
    client.query({
      query,
      variables,
    }),
  mutate: (mutation, variables) =>
    client.mutate({
      mutation,
      variables,
    }),
};
