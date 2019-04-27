import {
  query,
  mutate,
} from '@/services/graphql'

const gql = `
query {
  list: productTypeAll {
    productTypeId
    parentTypeId
    productTypeName
    description
  }
}`

export default {
  namespace: 'productType',
  state: {
    list: [],
  },
  effects: {
    *list({ payload }, { call, put }) {
      console.log(type, payload)
      const response = yield call(query, gql);
      yield put({
        type: 'setList',
        payload: response.data,
      });
    },
    *create({ payload, callback }, { call, put }) {
      console.log(type, payload)
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      
      if (callback) callback();
    },
  },
  reducers: {
    setList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};