import {
  getProductList,
  getProductInfo,
  addProduct,
  updateProduct,
  deleteProduct
} from '@/services/api';

const objToTree = (root, data, id, pId, title) => {
  const keys =  Object.keys(data)
    .filter(key => data[key][pId] === root[id])
  if(keys.length > 0) {
    // eslint-disable-next-line no-param-reassign
    root.children = []
    keys.forEach(key => root.children.push(objToTree(data[key], data, id, pId, title)))
  }
  return {
    value: root[id],
    title: root[title],
    children: root.children
  }
}

export default {
  namespace: 'productCategory',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    tree: [],
  },

  effects: {
    *findOne({ payload }, { call, put }) {
      const { type, key } = payload
      const info = yield call(getProductInfo, type, key);
      yield put({
        type: 'createInfo',
        payload: info,
      });
    },
    *tree({ payload }, { call, put }) {
      const { type, id, pId, title } = payload
      const { list } = yield call(getProductList, type);
      yield put({
        type: 'createTree',
        payload: [objToTree({[id]: "", [title]: "父级节点"}, list, id, pId, title)],
      });
    },
    *save({ payload, callback }, { call, put }) {
      const { type, id, pId, title, payload: params } = payload
      const { list } = yield call(addProduct, type, params);
      yield put({
        type: 'createTree',
        payload: [objToTree({[id]: "", [title]: "父级节点"}, list, id, pId, title)],
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const { type, id, pId, title, key, payload: params } = payload
      const { list } = yield call(updateProduct, type, key, params);
      yield put({
        type: 'createTree',
        payload: [objToTree({[id]: "", [title]: "父级节点"}, list, id, pId, title)],
      });
      yield put({type: 'findOne', payload})
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const { type, id, pId, title, key, payload: params } = payload
      yield call(deleteProduct, type, key, params);
      const { list } = yield call(getProductList, type);
      yield put({
        type: 'createTree',
        payload: [objToTree({[id]: "", [title]: "父级节点"}, list, id, pId, title)],
      });
      if (callback) callback();
    },
  },

  reducers: {
    createInfo(state, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
    createTree(state, action) {
      return {
        ...state,
        tree: action.payload,
      };
    },
  },
};