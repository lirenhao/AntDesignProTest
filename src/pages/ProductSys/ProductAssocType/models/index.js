import { queryProductAssocType, addProductAssocType } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'productAssocType',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProductAssocType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *submitAddForm({ payload, callback }, { call, put }) {
      const response = yield call(addProductAssocType, payload);
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
