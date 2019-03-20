import moment from 'moment'

const objToTree = (root, data, id, pId) => {
  const keys =  Object.keys(data)
    .filter(key => data[key][pId] === root[id])
  if(keys.length > 0) {
    // eslint-disable-next-line no-param-reassign
    root.children = []
    keys.forEach(key => root.children.push(objToTree(data[key], data, id, pId)))
  }
  return root
}

export default {

  namespace: 'partyType',

  state: {
    list: [],
    info: {},
    partyType: {
      "1": {
        partyTypeId: "1",
        parentTypeId: "",
        hasTable: "0",
        description: "个人",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "2": {
        partyTypeId: "2",
        parentTypeId: "",
        hasTable: "0",
        description: "组织",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "3": {
        partyTypeId: "3",
        parentTypeId: "2",
        hasTable: "0",
        description: "法定组织",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "4": {
        partyTypeId: "4",
        parentTypeId: "2",
        hasTable: "0",
        description: "非正式组织",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "5": {
        partyTypeId: "5",
        parentTypeId: "3",
        hasTable: "0",
        description: "公司",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "6": {
        partyTypeId: "7",
        parentTypeId: "3",
        hasTable: "0",
        description: "政府机构",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "7": {
        partyTypeId: "7",
        parentTypeId: "4",
        hasTable: "0",
        description: "团队",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "8": {
        partyTypeId: "8",
        parentTypeId: "4",
        hasTable: "0",
        description: "家庭",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "9": {
        partyTypeId: "9",
        parentTypeId: "4",
        hasTable: "0",
        description: "其他非正式组织",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
    },
    roleType: {
      "1": {
        roleTypeId: "1",
        parentTypeId: "",
        hasTable: "0",
        description: "人员角色",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "11": {
        roleTypeId: "11",
        parentTypeId: "1",
        hasTable: "0",
        description: "雇员",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "12": {
        roleTypeId: "12",
        parentTypeId: "1",
        hasTable: "0",
        description: "签约人",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "13": {
        roleTypeId: "13",
        parentTypeId: "1",
        hasTable: "0",
        description: "家庭成员",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "14": {
        roleTypeId: "14",
        parentTypeId: "1",
        hasTable: "0",
        description: "联络员",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "2": {
        roleTypeId: "2",
        parentTypeId: "",
        hasTable: "0",
        description: "客户",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "21": {
        roleTypeId: "21",
        parentTypeId: "2",
        hasTable: "0",
        description: "付款客户",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "22": {
        roleTypeId: "22",
        parentTypeId: "2",
        hasTable: "0",
        description: "装运客户",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "23": {
        roleTypeId: "23",
        parentTypeId: "2",
        hasTable: "0",
        description: "最终用户客户",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "3": {
        roleTypeId: "3",
        parentTypeId: "",
        hasTable: "0",
        description: "潜在客户",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "4": {
        roleTypeId: "4",
        parentTypeId: "",
        hasTable: "0",
        description: "股东",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "5": {
        roleTypeId: "5",
        parentTypeId: "",
        hasTable: "0",
        description: "组织角色",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "51": {
        roleTypeId: "51",
        parentTypeId: "5",
        hasTable: "0",
        description: "分销渠道",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "52": {
        roleTypeId: "52",
        parentTypeId: "5",
        hasTable: "0",
        description: "合作伙伴",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "53": {
        roleTypeId: "53",
        parentTypeId: "5",
        hasTable: "0",
        description: "竞争对手",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "54": {
        roleTypeId: "54",
        parentTypeId: "5",
        hasTable: "0",
        description: "住户",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "55": {
        roleTypeId: "55",
        parentTypeId: "5",
        hasTable: "0",
        description: "管理机构",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "56": {
        roleTypeId: "56",
        parentTypeId: "5",
        hasTable: "0",
        description: "供应商",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "57": {
        roleTypeId: "57",
        parentTypeId: "5",
        hasTable: "0",
        description: "协会",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "58": {
        roleTypeId: "58",
        parentTypeId: "51",
        hasTable: "0",
        description: "代理商",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "59": {
        roleTypeId: "59",
        parentTypeId: "51",
        hasTable: "0",
        description: "分销商",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "6": {
        roleTypeId: "6",
        parentTypeId: "",
        hasTable: "0",
        description: "组织单位",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "61": {
        roleTypeId: "61",
        parentTypeId: "6",
        hasTable: "0",
        description: "上级机构",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "62": {
        roleTypeId: "62",
        parentTypeId: "6",
        hasTable: "0",
        description: "部门",
      lastUpdatedStamp: "2019-03-17 11:39:38",
      createdStamp: "2019-03-17 10:39:38",
      version: "v1.0.0",
      },
      "63": {
        roleTypeId: "63",
        parentTypeId: "6",
        hasTable: "0",
        description: "分公司",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "64": {
        roleTypeId: "64",
        parentTypeId: "6",
        hasTable: "0",
        description: "分支机构",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "65": {
        roleTypeId: "65",
        parentTypeId: "6",
        hasTable: "0",
        description: "其他组织单位",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "7": {
        roleTypeId: "7",
        parentTypeId: "",
        hasTable: "0",
        description: "内部组织",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
    },
  },

  effects: {
    *add({ payload, callback }, { put }) {
      yield put({type: 'save', payload});
      if (payload.isTree) {
        yield put({type: 'tree', payload});
      } else {
        yield put({type: 'find', payload});
      }
      if (callback) callback();
    },
    *edit({ payload, callback }, { put }) {
      yield put({type: 'update', payload});
      if (payload.isTree) {
        yield put({type: 'tree', payload});
      } else {
        yield put({type: 'find', payload});
      }
      yield put({type: 'findOne', payload});
      if (callback) callback();
    },
    *remove({ payload, callback }, { put }) {
      yield put({type: 'delete', payload});
      if (payload.isTree) {
        yield put({type: 'tree', payload});
      } else {
        yield put({type: 'find', payload});
      }
      if (callback) callback();
    }
  },

  reducers: {
    tree(state, action) {
      const { type, id, pId } = action.payload
      const data = state[type] || {}
      return {
        ...state,
        list: objToTree({[id]: ''}, data, id, pId).children,
      };
    },
    find(state, action) {
      const { type } = action.payload
      const data = state[type] || {}
      return {
        ...state,
        list: Object.keys(data).map(key => data[key]),
      };
    },
    findOne(state, action) {
      const { type, key } = action.payload
      const data = state[type] || {}
      return {
        ...state,
        info: data[key] || {},
      };
    },
    save(state, action) {
      const { type, payload } = action.payload
      const data = state[type] || {}
      data[payload.key] = { 
        ...payload,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: "v1.0.0",
      }
      return {
        ...state,
        [type]: data,
      };
    },
    update(state, action) {
      const { type, key, payload } = action.payload
      const data = state[type] || {}
      data[key] = { 
        ...data[key],
        ...payload,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      return {
        ...state,
        [type]: data,
      };
    },
    delete(state, action) {
      const { type, key } = action.payload
      const data = state[type] || {}
      delete data[key]
      return {
        ...state,
        [type]: data,
      };
    },
  },
}