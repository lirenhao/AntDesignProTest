import { getDictData } from '@/services/api';
import { queryProduct, queryPrice, findOrder, save, update, remove } from '@/services/order';

export default {
  namespace: 'order',

  state: {
    data: [],
    dict: {
      productType: [],
      productCategoty: [],
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
    *findProduct({ payload, callback }, { call }) {
      const response = yield call(queryProduct, payload);
      if (callback) callback(response);
    },
    *findPrice({ payload, callback }, { call }) {
      const response = yield call(queryPrice, payload);
      if (callback) callback(response);
    },
    *findAll({ payload }, { call, put }) {
      const response = yield call(findOrder, payload);
      yield put({
        type: 'createData',
        payload: response,
      });
    },
    *save({ payload, callback }, { call, put }) {
      const response = yield call(save, payload);
      yield put({
        type: 'createData',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const { key, payload: params } = payload;
      const response = yield call(update, key, params);
      yield put({
        type: 'createData',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
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
