import { parse } from 'url';
import moment from 'moment';

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
    list: product,
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

const productCategory = [
  {
    productCategoryId: '1',
    productCategoryTypeId: '1',
    primaryParentCategoryId: '',
    categoryName: 'test-1',
    description: 'description',
    lastUpdatedStamp: '2019-03-17 11:39:38',
    createdStamp: '2019-03-17 10:39:38',
    version: 'v1.0.0',
  },
  {
    productCategoryId: '2',
    productCategoryTypeId: '2',
    primaryParentCategoryId: '',
    categoryName: 'test-2',
    description: 'description',
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
      list: productCategory,
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
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'), 
    createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'), 
    version: 'v1.0.0',
  })
  return getProductCategory(req, res, u);
}

const productCategoryRollup = []

function postProductCategoryRollup(req, res, u, b) {
  const body = (b && b.body) || req.body;
  productCategoryRollup.forEach((item, index) => {
    productCategoryRollup.splice(index, 1)
  })
  body.ids.forEach(r => {
    productCategoryRollup.push({
      productCategoryId: body.id,
      parentProductCategoryId: r,
    })
  })
  res.send('Ok');
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
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    version: 'v1.0.0',
  })
  return getProductFeature(req, res, u);
}

const productPrice = []

function getProductPrice(req, res, u) {
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
      list: productPrice,
      pagination: {
        total: productPrice.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
  };

  return res.json(result);
}

function postProductPrice(req, res, u, b) {
  const body = (b && b.body) || req.body;
  productPrice.unshift({
    productPriceId: productPrice.length + 1,
    productPriceTypeId: body.productPriceTypeId,
    productPricePurposeId: body.productPricePurposeId,
    description: body.description,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    version: 'v1.0.0',
  })
  return getProductPrice(req, res, u);
}

export default {
  'GET /api/product': getProduct,
  'POST /api/product': postProduct,
  'GET /api/productCategory': getProductCategory,
  'POST /api/productCategory': postProductCategory,
  'POST /api/productCategoryRollup': postProductCategoryRollup,
  'GET /api/productFeature': getProductFeature,
  'POST /api/productFeature': postProductFeature,
  'GET /api/productPrice': getProductPrice,
  'POST /api/productPrice': postProductPrice,
};
