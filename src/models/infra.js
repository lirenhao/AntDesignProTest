import {
  getList,
  getByUnionId,
  saveUnion,
  save,
  update,
  remove
} from '@/services/infra';

export default {
  namespace: 'infra',

  state: {
    list: {},
  },

  effects: {
    *findAll({ payload }, { call, put }) {
      const { type, payload: params } = payload
      const response = yield call(getList, type, params);
      yield put({
        type: 'refresh',
        payload: {
          type,
          list: response,
        },
      });
    },
    *findByUnionId({ payload }, { call, put }) {
      const { type, unionId } = payload
      const response = yield call(getByUnionId, type, unionId);
      yield put({
        type: 'refresh',
        payload: {
          type,
          list: response,
        },
      });
    },
    *save({ payload, callback }, { call, put }) {
      const { type, payload: params } = payload
      const response = yield call(save, type, params);
      yield put({
        type: 'refresh',
        payload: {
          type,
          list: response,
        },
      });
      if (callback) callback();
    },
    *saveUnion({ payload, callback }, { call, put }) {
      const { type, payload: params } = payload
      const response = yield call(saveUnion, type, params);
      yield put({
        type: 'refresh',
        payload: {
          type,
          list: response,
        },
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const { type, key, payload: params } = payload
      const response = yield call(update, type, key, params);
      yield put({
        type: 'refresh',
        payload: {
          type,
          list: response,
        },
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { type, key, isUnion } = payload
      yield call(remove, type, key);
      if(isUnion) {
        yield put({type: 'findByUnionId', payload})
      } else {
        yield put({type: 'findAll', payload})
      }
      if (callback) callback();
    },
  },

  reducers: {
    refresh(state, action) {
      const { type, list } = action.payload
      return {
        ...state,
        list: {
          ...state.list,
          [type]: list
        },
      };
    },
  },
};
