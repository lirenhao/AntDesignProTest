import {
  getProductAssoc,
  addProductAssoc,
  updateProductAssoc,
  deleteProductAssoc,
} from '@/services/api';

export default {
  namespace: 'productAssoc',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(getProductAssoc, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *save({ payload, callback }, { call, put }) {
      const response = yield call(addProductAssoc, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const { key, payload: params } = payload
      const response = yield call(updateProductAssoc, key, params);
      yield put({
        type: 'createData',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { key, assocTypeId } = payload
      yield call(deleteProductAssoc, key);
      yield put({
        type: 'fetch',
        payload: assocTypeId,
      });
      if (callback) callback();
    },
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
}