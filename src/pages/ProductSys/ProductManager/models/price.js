import {
  getProductPriceComponent,
  addProductPriceComponent,
  updateProductPriceComponent,
  deleteProductPriceComponent,
} from '@/services/api';

export default {
  namespace: 'productPriceComp',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(getProductPriceComponent, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *save({ payload, callback }, { call, put }) {
      const response = yield call(addProductPriceComponent, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const { key, payload: params } = payload
      const response = yield call(updateProductPriceComponent, key, params);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { key, productId } = payload
      yield call(deleteProductPriceComponent, key);
      yield put({
        type: 'fetch',
        payload: productId,
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