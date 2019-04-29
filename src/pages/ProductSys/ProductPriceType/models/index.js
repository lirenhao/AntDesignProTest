import { query, mutate } from '@/services/graphql';
import gql from 'graphql-tag';

export default {
  namespace: 'productPriceType',
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
              list: productPriceTypeAll {
                productPriceTypeId
                productPriceTypeName
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
            mutation($record: ProductPriceTypeInput) {
              item: productPriceTypeInsert(record: $record) {
                productPriceTypeId
                productPriceTypeName
                description
              }
            }
          `,
          {
            record: {
              productPriceTypeName: payload.productPriceTypeName,
              description: payload.description,
            },
          }
        );
        yield put({
          type: 'addList',
          payload: response.data.item,
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
            mutation($id: String, $record: ProductPriceTypeInput) {
              item: productPriceTypeUpdateById(id: $id, record: $record) {
                productPriceTypeId
                productPriceTypeName
                description
              }
            }
          `,
          {
            id: payload.productPriceTypeId,
            record: {
              productPriceTypeName: payload.productPriceTypeName,
              description: payload.description,
            },
          }
        );
        yield put({
          type: 'updateList',
          payload: response.data.item,
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
              result: productPriceTypeDeleteById(id: $id)
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
          item.productPriceTypeId === action.payload.productPriceTypeId
            ? { ...item, ...action.payload }
            : item
        ),
      };
    },
    removeList(state, action) {
      return {
        ...state,
        list: state.list.filter(item => item.productPriceTypeId !== action.payload),
      };
    },
  },
};
