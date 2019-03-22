import moment from 'moment'

let index = 100

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

  namespace: 'productType',

  state: {
    tree: {},
    list: {},
    info: {},
    // 类型
    type: {
      "1": {
        "productTypeId": "1",
        "parentTypeId": "",
        "isPhysical": "0",
        "isDigital": "0",
        "hasTable": "0",
        "productTypeName": "实物",
        "descript": "实物",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "2": {
        "productTypeId": "2",
        "parentTypeId": "",
        "isPhysical": "0",
        "isDigital": "0",
        "hasTable": "0",
        "productTypeName": "服务",
        "descript": "服务",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "3": {
        "productTypeId": "3",
        "parentTypeId": "",
        "isPhysical": "0",
        "isDigital": "0",
        "hasTable": "0",
        "productTypeName": "虚拟产品",
        "descript": "虚拟产品",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "11": {
        "productTypeId": "11",
        "parentTypeId": "1",
        "isPhysical": "0",
        "isDigital": "0",
        "hasTable": "0",
        "productTypeName": "制成品",
        "descript": "制成品",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "12": {
        "productTypeId": "12",
        "parentTypeId": "1",
        "isPhysical": "0",
        "isDigital": "0",
        "hasTable": "0",
        "productTypeName": "原材料",
        "descript": "原材料",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "13": {
        "productTypeId": "13",
        "parentTypeId": "1",
        "isPhysical": "0",
        "isDigital": "0",
        "hasTable": "0",
        "productTypeName": "半成品",
        "descript": "半成品",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "14": {
        "productTypeId": "14",
        "parentTypeId": "1",
        "isPhysical": "0",
        "isDigital": "0",
        "hasTable": "0",
        "productTypeName": "数字产品",
        "descript": "数字产品",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      }
    },
    // 关联类型
    assocType: {
      "1": {
        "productAssocTypeId": "1",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "自由套餐",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "2": {
        "productAssocTypeId": "2",
        "parentTypeId": "",
        "hasTable": "0",
        "description": " 套餐A",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "3": {
        "productAssocTypeId": "3",
        "parentTypeId": "",
        "hasTable": "0",
        "description": " 套餐B",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      }
    },
    // 类别类型
    categoryType: {
      "1": {
        "productCategoryTypeId": "1",
        "parentTypeId": "",
        "hasTable": "0",
        "description": " 产品用途类别",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "2": {
        "productCategoryTypeId": "2",
        "parentTypeId": "",
        "hasTable": "0",
        "description": " 产品行业类别",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "3": {
        "productCategoryTypeId": "3",
        "parentTypeId": "",
        "hasTable": "0",
        "description": " 产品材料类别",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      }
    },
    // 特征类型
    featureType: {
      "1": {
        "productFeatureTypeId": "1",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "产品质量",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "2": {
        "productFeatureTypeId": "2",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "颜色",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "3": {
        "productFeatureTypeId": "3",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "尺寸（指定数目）",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "4": {
        "productFeatureTypeId": "4",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "大小",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "5": {
        "productFeatureTypeId": "5",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "商标",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "6": {
        "productFeatureTypeId": "6",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "软件特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "7": {
        "productFeatureTypeId": "7",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "硬件特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "8": {
        "productFeatureTypeId": "8",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "付款特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "9": {
        "productFeatureTypeId": "9",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "其他特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      }
    },
    // 特征互作用类型
    featureIactnType: {
      "1": {
        "productFeatureIactnTypeId": "1",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "不兼容性",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "2": {
        "productFeatureIactnTypeId": "2",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "兼容性",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "3": {
        "productFeatureIactnTypeId": "3",
        "parentTypeId": "2",
        "hasTable": "0",
        "description": "依赖性",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "4": {
        "productFeatureIactnTypeId": "4",
        "parentTypeId": "2",
        "hasTable": "0",
        "description": "互补性",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
    },
    // 特征适用性类型
    featureApplType: {
      "1": {
        "productFeatureApplTypeId": "1",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "必备特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "2": {
        "productFeatureApplTypeId": "2",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "标准特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "3": {
        "productFeatureApplTypeId": "3",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "任选特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "4": {
        "productFeatureApplTypeId": "4",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "可选特征",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      }
    },
    // 价格类型
    priceType: {
      "1": {
        "productPriceTypeId": "1",
        "description": "基价",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "2": {
        "productPriceTypeId": "2",
        "description": "折扣成分",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "3": {
        "productPriceTypeId": "3",
        "description": "额外收费成分",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "4": {
        "productPriceTypeId": "4",
        "description": "厂商建议价",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "5": {
        "productPriceTypeId": "5",
        "description": "一次性",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      }
    },
    // 价格用途
    pricePurpose: {
      "1": {
        "productPricePurposeId": "1",
        "description": "销售",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "2": {
        "productPricePurposeId": "2",
        "description": "采购",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "3": {
        "productPricePurposeId": "3",
        "description": "使用费",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "4": {
        "productPricePurposeId": "4",
        "description": "重复收费",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      }
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
