import { queryProductFeatureType, addProductFeatureType } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'productFeatureType',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProductFeatureType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *submitAddForm({ payload, callback }, { call, put }) {
      const response = yield call(addProductFeatureType, payload);
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
  },
};
