import { queryProductFeature, addProductFeature } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'productFeature',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    info: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProductFeature, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *submitCreateForm({ payload, callback }, { call, put }) {
      const response = yield call(addProductFeature, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      message.success('提交成功');
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    info(state, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
};
