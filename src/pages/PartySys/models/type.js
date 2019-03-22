import moment from "moment"

let index = 100

const objToTree = (root, data, id, pId, title) => {
  const keys = Object.keys(data)
    .filter(key => data[key][pId] === root[id])
  if (keys.length > 0) {
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

  namespace: "partyType",

  state: {
    tree: {},
    list: {},
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
    categoryType: {
      "1": {
        partyCategoryTypeId: "1",
        parentTypeId: "",
        description: "年收入",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "2": {
        partyCategoryTypeId: "2",
        parentTypeId: "",
        description: "平等机会",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "3": {
        partyCategoryTypeId: "3",
        parentTypeId: "",
        description: "收入",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "4": {
        partyCategoryTypeId: "4",
        parentTypeId: "",
        description: "行业",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "5": {
        partyCategoryTypeId: "5",
        parentTypeId: "",
        description: "少数民族",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "6": {
        partyCategoryTypeId: "6",
        parentTypeId: "",
        description: "在职员工人数",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "7": {
        partyCategoryTypeId: "7",
        parentTypeId: "",
        description: "组织",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "8": {
        partyCategoryTypeId: "8",
        parentTypeId: "",
        description: "所有权",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "9": {
        partyCategoryTypeId: "9",
        parentTypeId: "",
        description: "SIC代码",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },

      "10": {
        partyCategoryTypeId: "10",
        parentTypeId: "",
        description: "贸易",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "11": {
        partyCategoryTypeId: "11",
        parentTypeId: "10",
        description: "零售",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "12": {
        partyCategoryTypeId: "12",
        parentTypeId: "10",
        description: "批发",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "13": {
        partyCategoryTypeId: "13",
        parentTypeId: "",
        description: "价值评级",
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
    relationshipType: {
      "1": {
        partyRelationshipTypeId: "1",
        parentTypeId: "",
        hasTable: "0",
        partyRelationshipName: "供应商关系",
        roleTypeIdValidFrom: "",
        roleTypeIdValidTo: "",
        description: "供应商关系",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "2": {
        partyRelationshipTypeId: "2",
        parentTypeId: "",
        hasTable: "0",
        partyRelationshipName: "组织联络员关系",
        roleTypeIdValidFrom: "",
        roleTypeIdValidTo: "",
        description: "组织联络员关系",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "3": {
        partyRelationshipTypeId: "3",
        parentTypeId: "",
        hasTable: "0",
        partyRelationshipName: "雇佣关系",
        roleTypeIdValidFrom: "",
        roleTypeIdValidTo: "",
        description: "雇佣关系",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "4": {
        partyRelationshipTypeId: "4",
        parentTypeId: "",
        hasTable: "0",
        partyRelationshipName: "客户关系",
        roleTypeIdValidFrom: "",
        roleTypeIdValidTo: "",
        description: "客户关系",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "5": {
        partyRelationshipTypeId: "5",
        parentTypeId: "",
        hasTable: "0",
        partyRelationshipName: "分销渠道关系",
        roleTypeIdValidFrom: "",
        roleTypeIdValidTo: "",
        description: "分销渠道关系",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "6": {
        partyRelationshipTypeId: "6",
        parentTypeId: "",
        hasTable: "0",
        partyRelationshipName: "合作关系",
        roleTypeIdValidFrom: "",
        roleTypeIdValidTo: "",
        description: "合作关系",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "7": {
        partyRelationshipTypeId: "7",
        parentTypeId: "",
        hasTable: "0",
        partyRelationshipName: "组织隶属关系",
        roleTypeIdValidFrom: "",
        roleTypeIdValidTo: "",
        description: "组织隶属关系",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
    },
    contactMechType: {
      "1": {
        contactMethTypeId: "1",
        parentTypeId: "",
        hasTable: "0",
        description: "电子地址",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "2": {
        contactMethTypeId: "2",
        parentTypeId: "",
        hasTable: "0",
        description: "邮政地址",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "3": {
        contactMethTypeId: "3",
        parentTypeId: "",
        hasTable: "0",
        description: "电话号码",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
    },
    contactMechPurposeType: {
      "1": {
        contactMethPurposeTypeId: "1",
        description: "Purchase Return Address",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "2": {
        contactMethPurposeTypeId: "2",
        description: "Shipping Origin Address",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "3": {
        contactMethPurposeTypeId: "3",
        description: "Shipping Destination Address",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "4": {
        contactMethPurposeTypeId: "4",
        description: "Support Email",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "5": {
        contactMethPurposeTypeId: "5",
        description: "Shipping Origin Phone Number",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "6": {
        contactMethPurposeTypeId: "6",
        description: "Shipping Destination Phone Number",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "7": {
        contactMethPurposeTypeId: "7",
        description: "Main Work Phone Number",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
      "8": {
        contactMethPurposeTypeId: "8",
        description: "Secondary Work Phone Number",
        lastUpdatedStamp: "2019-03-17 11:39:38",
        createdStamp: "2019-03-17 10:39:38",
        version: "v1.0.0",
      },
    },
  },

  effects: {
    * add({
      payload,
      callback
    }, {
      put
    }) {
      yield put({
        type: "save",
        payload
      });
      if (payload.isTree) {
        yield put({
          type: "tree",
          payload
        });
      } else {
        yield put({
          type: "find",
          payload
        });
      }
      if (callback) callback();
    },
    * edit({
      payload,
      callback
    }, {
      put
    }) {
      yield put({
        type: "update",
        payload
      });
      if (payload.isTree) {
        yield put({
          type: "tree",
          payload
        });
      } else {
        yield put({
          type: "find",
          payload
        });
      }
      yield put({
        type: "findOne",
        payload
      });
      if (callback) callback();
    },
    * remove({
      payload,
      callback
    }, {
      put
    }) {
      yield put({
        type: "delete",
        payload
      });
      if (payload.isTree) {
        yield put({
          type: "tree",
          payload
        });
      } else {
        yield put({
          type: "find",
          payload
        });
      }
      if (callback) callback();
    }
  },

  reducers: {
    tree(state, action) {
      const {
        type,
        id,
        pId,
        title
      } = action.payload
      const data = state[type] || {}
      const tree = {
        ...state.tree,
        [type]: [objToTree({
          [id]: "",
          [title]: "父级节点"
        }, data, id, pId, title)],
      }
      return {
        ...state,
        tree
      };
    },
    find(state, action) {
      const {
        type
      } = action.payload
      const data = state[type] || {}
      const list = {
        ...state.list,
        [type]: Object.keys(data).map(key => data[key]),
      }
      return {
        ...state,
        list,
      };
    },
    findOne(state, action) {
      const {
        type,
        key
      } = action.payload
      const data = state[type] || {}
      return {
        ...state,
        info: data[key] || {},
      };
    },
    save(state, action) {
      const {
        type,
        id,
        payload
      } = action.payload
      const data = state[type] || {}
      const key = index.toString()
      index += 1
      data[key] = {
        ...payload,
        [id]: key,
        lastUpdatedStamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        createdStamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        version: "v1.0.0",
      }
      return {
        ...state,
        [type]: data,
      };
    },
    update(state, action) {
      const {
        type,
        key,
        payload
      } = action.payload
      const data = state[type] || {}
      data[key] = {
        ...data[key],
        ...payload,
        lastUpdatedStamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      }
      return {
        ...state,
        [type]: data,
      };
    },
    delete(state, action) {
      const {
        type,
        key
      } = action.payload
      const data = state[type] || {}
      delete data[key]
      return {
        ...state,
        [type]: data,
      };
    },
  },
}
