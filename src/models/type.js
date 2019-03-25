import { findAll, findType, saveType, updateType, removeType } from '@/services/type'
import { objToTree } from '@/utils/utils'

export default {
  namespace: 'type',
  state: {
    tree: {},
    list: {},
  },
  effects: {
    *init(action, { call, put }) {
      const response = yield call(findAll);
      yield put({
        type: 'initState',
        payload: response,
      })
    },
    *fetch({ payload, callback }, { call, put }) {
      const { type } = payload
      const response = yield call(findType, type);
      yield put({
        type: 'refreshState',
        payload: {
          type,
          payload: response,
        }
      })
      if (payload.isTree) {
        yield put({type: 'tree', payload});
      } else {
        yield put({type: 'find', payload});
      }
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const { type, payload: params } = payload 
      const response = yield call(saveType, type, params);
      yield put({
        type: 'refreshState',
        payload: {
          type,
          payload: response,
        }
      })
      if (payload.isTree) {
        yield put({type: 'tree', payload});
      } else {
        yield put({type: 'find', payload});
      }
      if (callback) callback();
    },
    *edit({ payload, callback }, { call, put }) {
      const { type, key, payload: params } = payload 
      const response = yield call(updateType, type, key, params);
      yield put({
        type: 'refreshState',
        payload: {
          type,
          payload: response,
        }
      })
      if (payload.isTree) {
        yield put({type: 'tree', payload});
      } else {
        yield put({type: 'find', payload});
      }
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { type, key } = payload 
      yield call(removeType, type, key);
      yield put({
        type: 'fetch', 
        payload,
        callback,
      })
    },
  },
  reducers: {
    initState(state, action) {
      return { ...state, ...action.payload, };
    },
    find(state, action) {
      const { type } = action.payload
      const data = state[type] || {}
      const list = {
        ...state.list,
        [type]: Object.keys(data).map(key => data[key]),
      }
      return { ...state, list, };
    },
    tree(state, action) {
      const { type, id, pId, title } = action.payload
      const data = state[type] || {}
      const tree = {
        ...state.tree,
        [type]: [objToTree({ [id]: "", [title]: "父级节点" }, data, id, pId, title)],
      }
      return { ...state, tree };
    },
    refreshState(state, action) {
      const { type, payload } = action.payload
      return {
        ...state,
        [type]: payload,
      };
    },
    refreshTree(state, action) {
      const { type, id, pId, title, data } = action.payload
      const tree = {
        ...state.tree,
        [type]: [objToTree({[id]: '', [title]: '父级节点'}, data, id, pId, title)],
      }
      return {...state, tree};
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch ({type: 'init'})
    },
  }
}