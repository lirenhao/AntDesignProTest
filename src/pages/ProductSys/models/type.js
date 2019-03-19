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

  namespace: 'productType',

  state: {
    list: [],
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
        "isTable": "0",
        "description": "自由套餐",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "2": {
        "productAssocTypeId": "2",
        "parentTypeId": "",
        "isTable": "0",
        "description": " 套餐A",
        "lastUpdatedStamp": "2019-03-17 11:39:38",
        "createdStamp": "2019-03-17 10:39:38",
        "version": "v1.0.0"
      },
      "3": {
        "productAssocTypeId": "3",
        "parentTypeId": "",
        "isTable": "0",
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
        "description": "特征互作用之不兼容性",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      },
      "2": {
        "productFeatureIactnTypeId": "2",
        "parentTypeId": "",
        "hasTable": "0",
        "description": "特征互作用之依赖性",
        "lastUpdatedStamp": "2019-03-17 11:39:38", 
        "createdStamp": "2019-03-17 10:39:38", 
        "version": "v1.0.0"
      }
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
      yield put({type: 'find', payload});
      if (callback) callback();
    },
    *edit({ payload, callback }, { put }) {
      yield put({type: 'update', payload});
      yield put({type: 'find', payload});
      if (callback) callback();
    },
    *remove({ payload, callback }, { put }) {
      yield put({type: 'delete', payload});
      yield put({type: 'find', payload});
      if (callback) callback();
    }
  },
  reducers: {
    tree(state, action) {
      const { type, id, pId } = action.payload
      const data = state[type] || {}
      return {
        ...state,
        list: objToTree({productTypeId: ''}, data, id, pId).children,
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
      const { type, id } = action.payload
      const data = state[type] || {}
      return {
        ...state,
        info: data[id],
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
      const { type, payload } = action.payload
      const data = state[type] || {}
      data[payload.key] = { 
        ...data[payload.key],
        ...payload,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      return {
        ...state,
        [type]: data,
      };
    },
    delete(state, action) {
      const { type, id } = action.payload
      const data = state[type] || {}
      delete data[id]
      return {
        ...state,
        [type]: data,
      };
    },
  },
}
