import {
  getDictData,
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
} from '@/services/api';

export default {
  namespace: 'product',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    dict: {
      productType: [{}],
      proudctCategoty: [{}],
      geo: [],
      productFeatureType: [],
      productFeature: [],
    },
  },

  effects: {
    *findDict(_, { call, put }) {
      const response = yield call(getDictData, '');
      yield put({
        type: 'initDict',
        payload: response,
      });
    },
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
    initDict(state, action) {
      return {
        ...state,
        dict: action.payload,
      };
    },
    createData(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
