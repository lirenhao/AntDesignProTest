import { query, mutate } from '@/services/graphql';
import gql from 'graphql-tag';
import { capitalize } from '@/utils/utils';
import tableConfig from '../Table/config';
import treeConfig from '../Tree/config';

const config = { ...tableConfig, ...treeConfig };

const filedsToGql = fileds =>
  fileds
    ? Object.keys(fileds)
        .map(key => (typeof fileds[key] === 'object' ? fileds[key].queryGql || key : key))
        .join(' ')
    : '';

const filedsToObj = (fileds, payload = {}) =>
  fileds
    ? Object.keys(fileds).reduce(
        (r, f) => ({
          ...r,
          [f]: fileds[f].type === 'date' ? payload[f].format('YYYY-MM-DD') : payload[f],
        }),
        {}
      )
    : {};

export default {
  namespace: 'template',
  state: {
    type: '',
    list: {},
  },
  effects: {
    *list({ payload }, { call, put, select }) {
      yield put({
        type: 'setType',
        payload,
      });
      const type = yield select(state => state.template.type);
      const { queryFileds, attachFileds } = config[type];
      try {
        const response = yield call(
          query,
          gql`
            query {
              ${type}: ${type}All {
                ${filedsToGql(queryFileds)}
              }
              ${filedsToGql(attachFileds)}
            }
          `
        );
        yield put({
          type: 'setList',
          payload: response.data,
        });
      } catch (error) {
        yield put({
          type: 'error',
          payload: error,
        });
      }
    },
    *create({ payload, callback }, { call, put, select }) {
      const type = yield select(state => state.template.type);
      const { queryFileds, mutateFileds } = config[type];
      const record = filedsToObj(mutateFileds, payload);
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($record: ${capitalize(type)}Input) {
              item: ${type}Insert(record: $record) {
                ${filedsToGql(queryFileds)}
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
      const type = yield select(state => state.template.type);
      const { genKey, queryFileds, mutateFileds } = config[type];
      const record = filedsToObj(mutateFileds, payload);
      try {
        const response = yield call(
          mutate,
          gql`
            mutation($id: String, $record:  ${capitalize(type)}Input) {
              item: ${type}UpdateById(id: $id, record: $record) {
                ${filedsToGql(queryFileds)}
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
      const type = yield select(state => state.template.type);
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
    setType(state, action) {
      return {
        ...state,
        type: action.payload,
      };
    },
    setList(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload,
        },
      };
    },
    addList(state, action) {
      return {
        ...state,
        list: { ...state.list, [state.type]: [...state.list[state.type], action.payload] },
      };
    },
    updateList(state, action) {
      const { genKey } = config[state.type];
      return {
        ...state,
        list: {
          ...state.list,
          [state.type]: state.list[state.type].map(item =>
            genKey(item) === genKey(action.payload) ? { ...item, ...action.payload } : item
          ),
        },
      };
    },
    removeList(state, action) {
      const { genKey } = config[state.type];
      return {
        ...state,
        list: {
          ...state.list,
          [state.type]: state.list[state.type].filter(item => genKey(item) !== action.payload),
        },
      };
    },
  },
};
