import { getProductList, addProduct, updateProduct, deleteProduct } from '@/services/api';

export default {
  namespace: 'product2',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *findAll({ payload }, { call, put }) {
      const { type, payload: params } = payload;
      const response = yield call(getProductList, type, params);
      yield put({
        type: 'createData',
        payload: response,
      });
    },
    *save({ payload, callback }, { call, put }) {
      const { type, payload: params } = payload;
      const response = yield call(addProduct, type, params);
      yield put({
        type: 'createData',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const { type, key, payload: params } = payload;
      const response = yield call(updateProduct, type, key, params);
      yield put({
        type: 'createData',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { type, key, payload: params } = payload;
      yield call(deleteProduct, type, key, params);
      const response = yield call(getProductList, type, params);
      yield put({
        type: 'createData',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    createData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
