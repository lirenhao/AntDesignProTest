import {
  getProductFeatureAppl,
  addProductFeatureAppl,
  deleteProductFeatureAppl,
} from '@/services/api';
import { productFeatureAppl } from '@/services/product'

export default {
  namespace: 'productFeatureApply',
  state: {
    data: {
      productFeatureApplType: [],
      productFeature: [],
      productFeatureAppl: [],
    },
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(productFeatureAppl, payload);
      yield put({
        type: 'data',
        payload: response.data,
      });
      if (callback) callback();
    },
    *save({ payload, callback }, { call, put }) {
      const response = yield call(addProductFeatureAppl, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { key, productId } = payload
      yield call(deleteProductFeatureAppl, key);
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