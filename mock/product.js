import { parse } from 'url';

const productType = [
  {
    productTypeId: 1, 
    parentTypeId: '', 
    isPhysical: '0', 
    isDigital: '0', 
    hasTable: '0', 
    productTypeName: '实物', 
    descript: '实物',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
    children: [
      {
        key: 11,
        productTypeId: 11, 
        parentTypeId: 1, 
        isPhysical: '0', 
        isDigital: '0', 
        hasTable: '0', 
        productTypeName: '制成品', 
        descript: '制成品',
        lastUpdatedStamp: '2019-03-17 11:39:38', 
        createdStamp: '2019-03-17 10:39:38', 
        version: 'v1.0.0',
      },
      {
        key: 12,
        productTypeId: 12, 
        parentTypeId: 1, 
        isPhysical: '0', 
        isDigital: '0', 
        hasTable: '0', 
        productTypeName: '原材料', 
        descript: '原材料',
        lastUpdatedStamp: '2019-03-17 11:39:38', 
        createdStamp: '2019-03-17 10:39:38', 
        version: 'v1.0.0',
      },
      {
        key: 13,
        productTypeId: 13, 
        parentTypeId: 1, 
        isPhysical: '0', 
        isDigital: '0', 
        hasTable: '0', 
        productTypeName: '半成品', 
        descript: '半成品',
        lastUpdatedStamp: '2019-03-17 11:39:38', 
        createdStamp: '2019-03-17 10:39:38', 
        version: 'v1.0.0',
      },
      {
        key: 14,
        productTypeId: 14, 
        parentTypeId: 1, 
        isPhysical: '0', 
        isDigital: '0', 
        hasTable: '0', 
        productTypeName: '数字产品', 
        descript: '数字产品',
        lastUpdatedStamp: '2019-03-17 11:39:38', 
        createdStamp: '2019-03-17 10:39:38', 
        version: 'v1.0.0',
      },
    ],
  },
  {
    productTypeId: 2, 
    parentTypeId: '', 
    isPhysical: '0', 
    isDigital: '0', 
    hasTable: '0', 
    productTypeName: '服务', 
    descript: '服务',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productTypeId: 3, 
    parentTypeId: '', 
    isPhysical: '0', 
    isDigital: '0', 
    hasTable: '0', 
    productTypeName: '虚拟产品', 
    descript: '虚拟产品',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
];

function getProductType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: productType,
    pagination: {
      total: productType.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postProductType(req, res, u) {
  return getProductType(req, res, u);
}

const product = [
  {
    productId: 1,
    productTypeId: '1',
    primaryProductCategoryId: '',
    manufacturePartyId: '',
    introductionDate: '',
    relaseDate: '',
    supportDiscontinuationDate: '',
    salesDiscontinuationDate: '',
    salesDiscWhenNotAvail: '',
    internalName: '',
    comments: '',
    productName: '公司新设立',
    description: '公司新设立',
    createdByUserLogin: '',
    updatedByUserLogin: '',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productId: 2,
    productTypeId: '2',
    primaryProductCategoryId: '',
    manufacturePartyId: '',
    introductionDate: '',
    relaseDate: '',
    supportDiscontinuationDate: '',
    salesDiscontinuationDate: '',
    salesDiscWhenNotAvail: '',
    internalName: '',
    comments: '',
    productName: '公司变更',
    description: '公司变更',
    createdByUserLogin: '',
    updatedByUserLogin: '',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productId: 3,
    productTypeId: '3',
    primaryProductCategoryId: '',
    manufacturePartyId: '',
    introductionDate: '',
    relaseDate: '',
    supportDiscontinuationDate: '',
    salesDiscontinuationDate: '',
    salesDiscWhenNotAvail: '',
    internalName: '',
    comments: '',
    productName: '国地税报道',
    description: '国地税报道',
    createdByUserLogin: '',
    updatedByUserLogin: '',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productId: 4,
    productTypeId: '1',
    primaryProductCategoryId: '',
    manufacturePartyId: '',
    introductionDate: '',
    relaseDate: '',
    supportDiscontinuationDate: '',
    salesDiscontinuationDate: '',
    salesDiscWhenNotAvail: '',
    internalName: '',
    comments: '',
    productName: '代理记账',
    description: '代理记账',
    createdByUserLogin: '',
    updatedByUserLogin: '',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
]

function getProduct(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: product.map(item => ({
      ...item,
      productType: productType[item.productTypeId - 1]
    })),
    pagination: {
      total: product.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postProduct(req, res, u, b) {
  const body = (b && b.body) || req.body;
  product.unshift({
    productId: product.length + 1,
    productTypeId: body.productTypeId,
    primaryProductCategoryId: '',
    manufacturePartyId: '',
    introductionDate: '',
    relaseDate: '',
    supportDiscontinuationDate: '',
    salesDiscontinuationDate: '',
    salesDiscWhenNotAvail: '',
    internalName: '',
    comments: '',
    productName: body.productName,
    description: body.description,
    createdByUserLogin: '',
    updatedByUserLogin: '',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  })
  return getProduct(req, res, u);
}

const productAssocType = [
  {
    productAssocTypeId: 1,
    parentTypeId: '',
    isTable: '0',
    description: ' 自由套餐',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productAssocTypeId: 2,
    parentTypeId: '',
    isTable: '0',
    description: ' 套餐A',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productAssocTypeId: 3,
    parentTypeId: '',
    isTable: '0',
    description: ' 套餐B',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
]

function geProductAssocType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: productAssocType,
    pagination: {
      total: productAssocType.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

const productCategoryType = [
  {
    productCategoryTypeId: 1,
    parentTypeId: '',
    hasTable: '0',
    description: ' 产品用途类别',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productCategoryTypeId: 2,
    parentTypeId: '',
    hasTable: '0',
    description: ' 产品行业类别',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productCategoryTypeId: 3,
    parentTypeId: '',
    hasTable: '0',
    description: ' 产品材料类别',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
]

function getProductCategoryType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: productCategoryType,
    pagination: {
      total: productCategoryType.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

const productCategory = [
  {
    productCategoryId: 1,
    productCategoryTypeId: '1',
    primaryParentCategoryId: '',
    categoryName: '',
    description: '',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productCategoryId: 2,
    productCategoryTypeId: '2',
    primaryParentCategoryId: '',
    categoryName: '',
    description: '',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
]

function getProductCategory(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
      list: productCategory.map(item => ({
        ...item,
        productCategoryType: productCategoryType[item.productCategoryTypeId - 1]
      })),
      pagination: {
        total: productCategory.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
  };

  return res.json(result);
}

function postProductCategory(req, res, u, b) {
  const body = (b && b.body) || req.body;
  productCategory.unshift({
    productCategoryId: productCategory.length + 1,
    productCategoryTypeId: body.productCategoryTypeId,
    primaryParentCategoryId: '',
    categoryName: body.categoryName,
    description: body.description,
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  })
  return getProductCategory(req, res, u);
}

const productFeatureType = [
  {
    productFeagureTypeId: 1,
    parentTypeId: '',
    hasTable: '0',
    description: '产品质量',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 2,
    parentTypeId: '',
    hasTable: '0',
    description: '颜色',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 3,
    parentTypeId: '',
    hasTable: '0',
    description: '尺寸（指定数目）',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 4,
    parentTypeId: '',
    hasTable: '0',
    description: '大小',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 5,
    parentTypeId: '',
    hasTable: '0',
    description: '商标',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 6,
    parentTypeId: '',
    hasTable: '0',
    description: '软件特征',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 7,
    parentTypeId: '',
    hasTable: '0',
    description: '硬件特征',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 8,
    parentTypeId: '',
    hasTable: '0',
    description: '付款特征',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productFeagureTypeId: 9,
    parentTypeId: '',
    hasTable: '0',
    description: '其他特征',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
]

function getProductFeatureType(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const params = parse(url, true).query;
  
    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }
  
    const result = {
        list: productFeatureType,
        pagination: {
          total: productFeatureType.length,
          pageSize,
          current: parseInt(params.currentPage, 10) || 1,
        },
    };

    return res.json(result);
}

function postProductFeatureType(req, res, u, b) {
  const body = (b && b.body) || req.body;
  productFeatureType.unshift({
    productFeagureTypeId: productFeatureType.length + 1,
    parentTypeId: '',
    hasTable: '0',
    description: body.description,
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  })
  return getProductFeatureType(req, res, u);
}

const productFeature = []

function getProductFeature(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
      list: productFeature.map(item => ({
        ...item,
        productFeatureType: productFeatureType[item.productFeatureTypeId - 1]
      })),
      pagination: {
        total: productFeatureType.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
  };

  return res.json(result);
}

function postProductFeature(req, res, u, b) {
  const body = (b && b.body) || req.body;
  productFeature.unshift({
    productFeatureId: productFeature.length + 1,
    productFeatureTypeId: body.productFeatureTypeId,
    description: body.description,
    uomId: body.uomId,
    numberSpecified: body.numberSpecified,
    defaultAmount: body.defaultAmount,
    defaultSequenceNum: body.defaultSequenceNum,
    ABBREV: body.ABBREV,
    idCode: body.idCode,
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  })
  return getProductFeature(req, res, u);
}

const productFeatureIactnType = [
  {
    productFeatureIactnTypeId: 1,
    parentTypeId: '',
    hasTable: '0',
    description: '特征互作用之不兼容性',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productFeatureIactnTypeId: 2,
    parentTypeId: '',
    hasTable: '0',
    description: '特征互作用之依赖性',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
]

function getProductFeatureIactnType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
      list: productFeatureIactnType,
      pagination: {
        total: productFeatureIactnType.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
  };

  return res.json(result);
}

const productFeatureApplType = [
  {
    productFeatureApplTypeId: '1',
    parentTypeId: '',
    hasTable: '0',
    description: '必备特征',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productFeatureApplTypeId: '2',
    parentTypeId: '',
    hasTable: '0',
    description: '标准特征',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productFeatureApplTypeId: '3',
    parentTypeId: '',
    hasTable: '0',
    description: '任选特征',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productFeatureApplTypeId: '4',
    parentTypeId: '',
    hasTable: '0',
    description: '可选特征',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
]

function getProductFeatureApplType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
      list: productFeatureApplType,
      pagination: {
        total: productFeatureApplType.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
  };

  return res.json(result);
}

const productPriceType = [
  {
    productPriceTypeId: '1',
    description: '基价',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productPriceTypeId: '2',
    description: '折扣成分',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productPriceTypeId: '3',
    description: '额外收费成分',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productPriceTypeId: '4',
    description: '厂商建议价',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productPriceTypeId: '5',
    description: '一次性',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
]

function getProductPriceType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
      list: productPriceType,
      pagination: {
        total: productPriceType.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
  };

  return res.json(result);
}

const productPricePurpose = [
  {
    productPricePurposeId: '1',
    description: '销售',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productPricePurposeId: '2',
    description: '采购',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productPricePurposeId: '3',
    description: '使用费',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
  {
    productPricePurposeId: '4',
    description: '重复收费',
    lastUpdatedStamp: '2019-03-17 11:39:38', 
    createdStamp: '2019-03-17 10:39:38', 
    version: 'v1.0.0',
  },
]

function getProductPricePurpose(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
      list: productPricePurpose,
      pagination: {
        total: productPricePurpose.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
  };

  return res.json(result);
}

export default {
  'GET /api/productType': getProductType,
  'POST /api/productType': postProductType,
  'GET /api/product': getProduct,
  'POST /api/product': postProduct,
  'GET /api/productAssocType': geProductAssocType,
  'GET /api/productCategoryType': getProductCategoryType,
  'GET /api/productCategory': getProductCategory,
  'POST /api/productCategory': postProductCategory,
  'GET /api/productFeatureType': getProductFeatureType,
  'POST /api/productFeatureType': postProductFeatureType,
  'GET /api/productFeature': getProductFeature,
  'POST /api/productFeature': postProductFeature,
  'GET /api/productFeatureIactnType': getProductFeatureIactnType,
  'GET /api/productFeatureApplType': getProductFeatureApplType,
  'GET /api/productPriceType': getProductPriceType,
  'GET /api/productPricePurpose': getProductPricePurpose,
};
