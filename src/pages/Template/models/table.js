import { query, mutate } from '@/services/graphql';
import gql from 'graphql-tag';
import { capitalize } from '@/utils/utils';
import config from '../Table/config';

export default {
  namespace: 'tempTable',
  state: {
    type: '',
    list: [],
  },
  effects: {
    *list({ payload }, { call, put, select }) {
      yield put({
        type: 'type',
        payload,
      });
      const type = yield select(state => state.tempTable.type);
      const queryFileds = config[type].queryFileds || [];
      try {
        const response = yield call(
          query,
          gql`
            query {
              list: ${type}All {
                ${queryFileds.join(' ')}
              }
            }
          `
        );
        yield put({
          type: 'setList',
          payload: response.data.list,
        });
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
    *create({ payload, callback }, { call, put, select }) {
      const type = yield select(state => state.tempTable.type);
      const { queryFileds, mutateFileds } = config[type];
      const record = mutateFileds.reduce((r, f) => ({ ...r, [f]: payload[f] }), {});
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($record: ${capitalize(type)}Input) {
              item: ${type}Insert(record: $record) {
                ${queryFileds.join(' ')}
              }
            }
          `,
          {
            record,
          }
        );
        yield put({
          type: 'addList',
          payload: response.data.item,
        });
        if (callback) callback();
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
    *update({ payload, callback }, { call, put, select }) {
      const type = yield select(state => state.tempTable.type);
      const { genKey, queryFileds, mutateFileds } = config[type];
      const record = mutateFileds.reduce((r, f) => ({ ...r, [f]: payload[f] }), {});
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($id: String, $record:  ${capitalize(type)}Input) {
              item: ${type}UpdateById(id: $id, record: $record) {
                ${queryFileds.join(' ')}
              }
            }
          `,
          {
            id: genKey(payload),
            record,
          }
        );
        yield put({
          type: 'updateList',
          payload: response.data.item,
        });
        if (callback) callback();
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
    *remove({ payload, callback }, { call, put, select }) {
      const type = yield select(state => state.tempTable.type);
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($id: String) {
              result: ${type}DeleteById(id: $id)
            }
          `,
          { id: payload }
        );
        if (response.data.result) {
          yield put({
            type: 'removeList',
            payload,
          });
        }
        if (callback) callback();
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
  },
  reducers: {
    type(state, action) {
      return {
        ...state,
        type: action.payload,
      };
    },
    setList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    addList(state, action) {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    updateList(state, action) {
      const { type } = state;
      const { genKey } = config[type];
      return {
        ...state,
        list: state.list.map(item =>
          genKey(item) === genKey(action.payload) ? { ...item, ...action.payload } : item
        ),
      };
    },
    removeList(state, action) {
      const { type } = state;
      const { genKey } = config[type];
      return {
        ...state,
        list: state.list.filter(item => genKey(item) !== action.payload),
      };
    },
  },
};
