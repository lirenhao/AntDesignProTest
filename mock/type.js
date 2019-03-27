import moment from 'moment'

let index = 100

const dataSource = {
  // 产品类型
  productType: {
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
  // 产品关联类型
  productAssocType: {
    "1": {
      "productAssocTypeId": "1",
      "parentTypeId": "",
      "hasTable": "0",
      "description": "产品组合包",
      "lastUpdatedStamp": "2019-03-17 11:39:38",
      "createdStamp": "2019-03-17 10:39:38",
      "version": "v1.0.0"
    },
  },
  // 产品类别类型
  productCategoryType: {
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
  // 产品特征类型
  productFeatureType: {
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
  // 产品特征互作用类型
  productFeatureIactnType: {
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
  // 产品特征适用性类型
  productFeatureApplType: {
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
  // 产品价格类型
  productPriceType: {
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
  // 产品价格用途
  productPricePurpose: {
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
  },
  // 当事人类型
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
      partyTypeId: "6",
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
  // 当事人身份标识类型
  partyIdentificationType: {
    '1': {
      partyIdentificationTypeId: '1',
      partyIdentificationTypeName: '身份证',
      parentTypeId: '',
      hasTable: '0',
      description: '身份证',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '2': {
      partyIdentificationTypeId: '2',
      partyIdentificationTypeName: '军官证',
      parentTypeId: '',
      hasTable: '0',
      description: '军官证',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '3': {
      partyIdentificationTypeId: '3',
      partyIdentificationTypeName: '驾驶证',
      parentTypeId: '',
      hasTable: '0',
      description: '驾驶证',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '4': {
      partyIdentificationTypeId: '4',
      partyIdentificationTypeName: '护照',
      parentTypeId: '',
      hasTable: '0',
      description: '护照',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '5': {
      partyIdentificationTypeId: '5',
      partyIdentificationTypeName: '排除工商银行账号/卡号（必须再独立的财务系统定义）',
      parentTypeId: '',
      hasTable: '0',
      description: '排除工商银行账号/卡号（必须再独立的财务系统定义）',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '6': {
      partyIdentificationTypeId: '6',
      partyIdentificationTypeName: '企业通一社会识别码',
      parentTypeId: '',
      hasTable: '0',
      description: '企业通一社会识别码',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    }
  },
  // 当事人类别类型
  partyCategoryType: {
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
  // 角色类型
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
  // 当事人关系类型
  partyRelationshipType: {
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
  // 联系机制类型
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
  // 联系机制用途类型
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
  // 通讯事件类型
  communicationEventType: {
    '1': {
      communicationEventTypeId: '1',
      communicationEventTypeName: '面对面',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '面对面',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '2': {
      communicationEventTypeId: '2',
      communicationEventTypeName: '电话',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '电话',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '3': {
      communicationEventTypeId: '3',
      communicationEventTypeName: '传真',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '传真',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '4': {
      communicationEventTypeId: '4',
      communicationEventTypeName: '写信',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '写信',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '5': {
      communicationEventTypeId: '5',
      communicationEventTypeName: '邮件',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '邮件',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '6': {
      communicationEventTypeId: '6',
      communicationEventTypeName: '座谈会',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '座谈会',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '7': {
      communicationEventTypeId: '7',
      communicationEventTypeName: '微信',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '微信',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '8': {
      communicationEventTypeId: '8',
      communicationEventTypeName: '上门拜访',
      parentTypeId: '',
      contactMechTypeId: '1',
      hasTable: '0',
      description: '上门拜访',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    }
  },
  // 通讯事件目的类型
  communicationEventPrpType: {
    '1': {
      communicationEventPrpTypeId: '1',
      communicationEventPrpTypeName: '技术支持呼叫',
      parentTypeId: '',
      hasTable: '0',
      description: '技术支持呼叫',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '2': {
      communicationEventPrpTypeId: '2',
      communicationEventPrpTypeName: '问询',
      parentTypeId: '',
      hasTable: '0',
      description: '问询',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '3': {
      communicationEventPrpTypeId: '3',
      communicationEventPrpTypeName: '客户服务呼叫',
      parentTypeId: '',
      hasTable: '0',
      description: '客户服务呼叫',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '4': {
      communicationEventPrpTypeId: '4',
      communicationEventPrpTypeName: '会议',
      parentTypeId: '',
      hasTable: '0',
      description: '会议',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '5': {
      communicationEventPrpTypeId: '5',
      communicationEventPrpTypeName: '活动邀请',
      parentTypeId: '',
      hasTable: '0',
      description: '活动邀请',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    }
  },
  // 审批类型
  businessLicenceApprovalType: {

  },
  // 状态类型
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
  // 内容用途类型
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
  // 数据资源类型
  dataResourceType: {

  },
  // 数据来源类型
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
    '1': {
      deliverableTypeId: '1',
      parentTypeId: '',
      deliverableTypeName: '实物成果',
      description: '可交付成果类型',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
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
    '1': {
      uomTypeId: '1',
      uomTypeName: '长度',
      parentTypeId: '',
      hasTable: '0',
      description: '度量单位类型长度',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
  },
  // 职位类型
  emplPositionType: {
    "1": {
      emplPositionTypeId: '1',
      parentTypeId: '',
      emplPositionTypeName: 'CEO类型',
      hasTable: '0',
      description: 'CEO类型',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
  },
  // 职责类型
  responsibilityType: {
    
  }
}

function findAll(req, res) {
  res.json(dataSource)
}

function find(req, res) {
  const { type } = req.params
  const data = dataSource[type]
  res.json(data)
}

function save(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type } = req.params
  const key = index.toString()
  index += 1
  dataSource[type][key] = {
    ...body,
    [body.id]: key,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    version: 'v1.0.0',
  }
  find(req, res)
}

function update(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type, key } = req.params
  dataSource[type][key] = {
    ...body,
    [body.id]: key,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
  }
  find(req, res)
}

function remove(req, res) {
  const { type, key } = req.params
  delete dataSource[type][key]
  res.end()
}

export default {
  'GET /api/type': findAll,
  'GET /api/type/:type': find,
  'POST /api/type/:type': save,
  'PUT /api/type/:type/:key': update,
  'DELETE /api/type/:type/:key': remove,
}