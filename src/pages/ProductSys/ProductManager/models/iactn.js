import {
  getProductFeatureIactn,
  addProductFeatureIactn,
  deleteProductFeatureIactn,
} from '@/services/api';
import { productFeatureIactn } from '@/services/product'

export default {
  namespace: 'productFeatureIactn',
  state: {
    data: {
      productFeatureIactnType: [],
      productFeature: [],
      productFeatureIactn: [],
    },
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(productFeatureIactn, payload);
      yield put({
        type: 'data',
        payload: response.data,
      });
      if (callback) callback();
    },
    *save({ payload, callback }, { call, put }) {
      const response = yield call(addProductFeatureIactn, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { key, productId } = payload
      yield call(deleteProductFeatureIactn, key);
      yield put({
        type: 'fetch',
        payload: productId,
      });
      if (callback) callback();
    },
  },
  reducers: {
    data(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
}