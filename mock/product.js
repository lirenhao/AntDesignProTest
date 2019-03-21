import { parse } from 'url'
import moment from 'moment'

let index = 100

const dataSource = {
  // 产品
  product: {
    "1": {
      productId: '1',
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
    "2": {
      productId: '2',
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
    "3": {
      productId: '3',
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
    "4": {
      productId: '4',
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
  },
  // 产品类别
  category: {
    "1": {
      productCategoryId: '1',
      productCategoryTypeId: '1',
      primaryParentCategoryId: '',
      categoryName: '类别一',
      description: '类别一',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
    "2": {
      productCategoryId: '2',
      productCategoryTypeId: '2',
      primaryParentCategoryId: '',
      categoryName: '类别二',
      description: '类别二',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  // 产品类别隶属
  categoryRollup: {

  },
  // 产品特征
  feature: {
    "1": {
      productFeatureId: '1',
      productFeatureTypeId: '1',
      description: '特征一',
      uomId: 'uomId',
      numberSpecified: '',
      defaultAmount: '',
      defaultSequenceNum: '',
      ABBREV: '',
      idCode: '',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
    "2": {
      productFeatureId: '2',
      productFeatureTypeId: '2',
      description: '特征二',
      uomId: 'uomId',
      numberSpecified: '',
      defaultAmount: '',
      defaultSequenceNum: '',
      ABBREV: '',
      idCode: '',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    }
  },
  // 产品特征互作用
  featureIactn: {

  },
  // 产品特征适用性
  featureAppl: {

  },
  // 产品价格
  price: {

  },
  // 产品价格成分
  priceComponent: {

  },
  // 产品类别分类/产品类别成员表
  categoryMember: {
    "1-1": {
      productCategoryId: '1',
      productId: '1',
      fromDate: '2019-03-17',
      thruDate: '2019-10-17',
      comments: 'comments',
      sequenceNum: '1',
      quantity: '10',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
    "1-2": {
      productCategoryId: '1',
      productId: '2',
      fromDate: '2019-03-17',
      thruDate: '2019-10-17',
      comments: 'comments',
      sequenceNum: '2',
      quantity: '10',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
}

function findAll(req, res, u) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url // eslint-disable-line
  }
  const params = parse(url, true).query
  let pageSize = 10
  if (params.pageSize) {
    pageSize = params.pageSize * 1
  }
  const { type } = req.params
  const data = dataSource[type] || {}
  const result = {
    list: Object.keys(data).map(key => data[key]),
    pagination: {
      total: Object.keys(data).length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  }
  res.json(result)
}

function findOne(req, res) {
  const { type, key } = req.params
  const data = dataSource[type] || {}
  return res.json(data[key])
}

function save(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type } = req.params
  const key = index.toString()
  index += 1
  const data = dataSource[type] || {}
  data[key] = {
    ...body,
    [body.id]: key,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    version: 'v1.0.0',
  }
  dataSource[type] = data
  return findAll(req, res, u)
}

function update(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type, key } = req.params
  const data = dataSource[type] || {}
  data[key] = {
    ...body,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
  }
  dataSource[type] = data
  return findAll(req, res, u)
}

function remove(req, res, u) {
  const { type, key } = req.params
  delete dataSource[type][key]
  return findAll(req, res, u)
}

function findMember(req, res) {
  const { key } = req.params
  const data = dataSource.categoryMember
  const result = Object.keys(data)
    .filter(v => v.split('-')[0] === key)
    .map(v => ({
      ...data[v],
      productName: dataSource.product[data[v].productId].productName,
    }))
  res.json(result)
}

function saveMember(req, res, u, b) {
  const body = (b && b.body) || req.body
  const key = `${body.productCategoryId}-${body.productId}`
  dataSource.categoryMember[key] = {
    ...body,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    version: 'v1.0.0',
  }
  req.params.key = body.productCategoryId
  return findMember(req, res, u)
}

function updateMember(req, res, u, b) {
  const { key } = req.params
  const body = (b && b.body) || req.body
  dataSource.categoryMember[key] = {
    ...body,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
  }
  req.params.key = key.split('-')[0] || ''
  return findMember(req, res, u)
}

function removeMember(req, res, u) {
  const { key } = req.params
  delete dataSource.categoryMember[key]
  req.params.key = key.split('-')[0] || ''
  return findMember(req, res, u)
}

export default {
  'GET /api/product/member/:key': findMember,
  'POST /api/product/member': saveMember,
  'PUT /api/product/member/:key': updateMember,
  'DELETE /api/product/member/:key': removeMember,
  'GET /api/product/:type': findAll,
  'GET /api/product/:type/:key': findOne,
  'POST /api/product/:type': save,
  'PUT /api/product/:type/:key': update,
  'DELETE /api/product/:type/:key': remove,
}