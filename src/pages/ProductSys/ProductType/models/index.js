import { query, mutate } from '@/services/graphql';
import gql from 'graphql-tag';

export default {
  namespace: 'productType',
  state: {
    list: [],
  },
  effects: {
    *list(action, { call, put }) {
      try {
        const response = yield call(
          query,
          gql`
            query {
              list: productTypeAll {
                productTypeId
                parentTypeId
                productTypeName
                description
              }
            }
          `
        );
        yield put({
          type: 'setList',
          payload: response.data.list,
        });
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
    *create({ payload, callback }, { call, put }) {
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($record: ProductTypeInput) {
              productType: productTypeInsert(record: $record) {
                productTypeId
                parentTypeId
                productTypeName
                description
              }
            }
          `,
          {
            record: {
              productTypeId: payload.productTypeId,
              parentTypeId: payload.parentTypeId,
              productTypeName: payload.productTypeName,
              description: payload.description,
            },
          }
        );
        yield put({
          type: 'addList',
          payload: response.data.productType,
        });
        if (callback) callback();
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
    *update({ payload, callback }, { call, put }) {
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($id: String, $record: ProductTypeInput) {
              productType: productTypeUpdateById(id: $id, record: $record) {
                productTypeId
                parentTypeId
                productTypeName
                description
              }
            }
          `,
          {
            id: payload.productTypeId,
            record: {
              parentTypeId: payload.parentTypeId,
              productTypeName: payload.productTypeName,
              description: payload.description,
            },
          }
        );
        yield put({
          type: 'updateList',
          payload: response.data.productType,
        });
        if (callback) callback();
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
    *remove({ payload, callback }, { call, put }) {
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($id: String) {
              result: productTypeDeleteById(id: $id)
            }
          `,
          { id: payload }
        );
        if (response.data.result) {
          yield put({
            type: 'removeList',
            payload,
          });
        }
        if (callback) callback();
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
  },
  reducers: {
    setList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    addList(state, action) {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    updateList(state, action) {
      return {
        ...state,
        list: state.list.map(item =>
          item.productTypeId === action.payload.productTypeId
            ? { ...item, ...action.payload }
            : item
        ),
      };
    },
    removeList(state, action) {
      return {
        ...state,
        list: state.list.filter(item => item.productTypeId !== action.payload),
      };
    },
  },
};
