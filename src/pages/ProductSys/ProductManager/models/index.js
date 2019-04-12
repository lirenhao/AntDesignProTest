import {
  addProductCategoryMember,
  updateProductCategoryMember,
  deleteProductCategoryMember,
} from '@/services/api';
import { productCategoryMember } from '@/services/product'

export default {
  namespace: 'productMember',
  state: {
    data: {
      productCategory: [],
      productCategoryMember: [],
    }
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(productCategoryMember);
      yield put({
        type: 'data',
        payload: response.data,
      });
      if (callback) callback();
    },
    *save({ payload, callback }, { call, put }) {
      const response = yield call(addProductCategoryMember, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const { productCategoryId, productId} = payload 
      const response = yield call(updateProductCategoryMember, `${productCategoryId}-${productId}`, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { productCategoryId, productId} = payload
      yield call(deleteProductCategoryMember, `${productCategoryId}-${productId}`);
      yield put({
        type: 'fetch',
        payload: productCategoryId,
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