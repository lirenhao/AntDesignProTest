import { queryProductAssoc, addProductAssoc } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'productAssoc',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProductAssoc, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *submitAddForm({ payload, callback }, { call, put }) {
      const response = yield call(addProductAssoc, payload);
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
