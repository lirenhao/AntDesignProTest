import {
  getProductCategoryMember,
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