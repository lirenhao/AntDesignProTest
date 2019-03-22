import {
  getProductCategoryMember,
  addProductCategoryMember,
  updateProductCategoryMember,
  deleteProductCategoryMember,
} from '@/services/api';

export default {
  namespace: 'productMember',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(getProductCategoryMember, payload);
      yield put({
        type: 'list',
        payload: response,
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
    list(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
}