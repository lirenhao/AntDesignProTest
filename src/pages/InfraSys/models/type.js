import moment from 'moment'
import { objToTree } from '@/utils/utils'

let index = 100

export default {

  namespace: 'infraType',

  state: {
    tree: {},
    list: {},
    info: {},
    statusType: {
      '1': {
        parentTypeId: '',
        hasTable: '0',
        description: '线索状态类型',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '1'
      },
      '2': {
        parentTypeId: '',
        hasTable: '0',
        description: '合同状态类型',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '2'
      },
      '3': {
        parentTypeId: '',
        hasTable: '0',
        description: '订单状态类型',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '3'
      },
      '4': {
        parentTypeId: '',
        hasTable: '0',
        description: '订单项状态类型',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '4'
      },
      '5': {
        parentTypeId: '',
        hasTable: '0',
        description: '发票状态类型',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '5'
      },
      '6': {
        parentTypeId: '',
        hasTable: '0',
        description: '工作计划状态类型',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '6'
      },
      '7': {
        parentTypeId: '',
        hasTable: '0',
        description: '预算',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '7'
      },
      '8': {
        parentTypeId: '',
        hasTable: '0',
        description: '内容审批',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '8'
      },
      '9': {
        parentTypeId: '',
        hasTable: '0',
        description: '通讯事件',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '9'
      },
      '10': {
        parentTypeId: '',
        hasTable: '0',
        description: '雇佣职位',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '10'
      },
      '11': {
        parentTypeId: '',
        hasTable: '0',
        description: '当事人资产',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '11'
      },
      '12': {
        parentTypeId: '',
        hasTable: '0',
        description: '当事人关系',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0',
        statusTypeId: '12'
      }
    },
    contentPurposeType: {
      '1': {
        contentPurposeTypeId: '1',
        contentPurposeTypeName: '广告',
        hasTable: '0',
        description: '广告',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      },
      '2': {
        contentPurposeTypeId: '2',
        contentPurposeTypeName: 'FAQ',
        hasTable: '0',
        description: 'FAQ',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      },
      '3': {
        contentPurposeTypeId: '3',
        contentPurposeTypeName: '摘要',
        hasTable: '0',
        description: '摘要',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      },
      '4': {
        contentPurposeTypeId: '4',
        contentPurposeTypeName: '反馈',
        hasTable: '0',
        description: '反馈',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      }
    },
    dataResourceType: {

    },
    // 
    dataSourceType: {
      '1': {
        dataSourceTypeId: '1',
        dataSourceTypeName: '行政数据录入',
        parentTypeId: '',
        hasTable: '0',
        description: '行政数据录入',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      },
      '2': {
        dataSourceTypeId: '2',
        dataSourceTypeName: '线索来源',
        parentTypeId: '',
        hasTable: '0',
        description: '线索来源',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      },
      '3': {
        dataSourceTypeId: '3',
        dataSourceTypeName: '百度来源',
        parentTypeId: '',
        hasTable: '0',
        description: '百度来源',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      },
      '4': {
        dataSourceTypeId: '4',
        dataSourceTypeName: '广告来源',
        parentTypeId: '',
        hasTable: '0',
        description: '广告来源',
        lastUpdatedStamp: '2019-03-17 11:39:38',
        createdStamp: '2019-03-17 10:39:38',
        version: 'v1.0.0'
      }
    },
    // 可交付成果类型
    deliverableType: {

    },
    // 多媒体类型
    mimeType: {

    },
    // 周期类型
    periodType: {

    },
    // 优先级类型
    priorityType: {

    },
    // 数量超出类型
    quantityBreakType: {

    },
    // 比率类型
    rateType: {

    },
    // 评级/评估类型
    ratingType: {

    },
    // 需求类型
    requirementType: {

    },
    // 销售类型
    saleType: {

    },
    // 技能类型
    skillType: {

    },
    // 度量单位类型
    uomType: {

    },
    // 职位类型
    emplPositionType: {

    },
    // 职责类型
    responsibilityType: {
      
    }
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
      const { type, id, pId, title } = action.payload
      const data = state[type] || {}
      const tree = {
        ...state.tree,
        [type]: [objToTree({[id]: "", [title]: "父级节点"}, data, id, pId, title)],
      }
      return {...state, tree};
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
    findOne(state, action) {
      const { type, key } = action.payload
      const data = state[type] || {}
      return {
        ...state,
        info: data[key] || {},
      };
    },
    save(state, action) {
      const { type, id, payload } = action.payload
      const data = state[type] || {}
      const key = index.toString()
      index += 1
      data[key] = { 
        ...payload,
        [id]: key,
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
