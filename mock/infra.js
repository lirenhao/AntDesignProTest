import moment from 'moment'

let index = 100

const dataSource = {
  statusItem: {
    '1': {
      statusId: '1',
      statusCode: 'BG_APPROVED',
      statusTypeId: '1',
      sequenceId: 1,
      hasTable: '0',
      description: 'BG_APPROVED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '2': {
      statusId: '2',
      statusCode: 'BG_CREATED',
      statusTypeId: '1',
      sequenceId: 2,
      hasTable: '0',
      description: 'BG_CREATED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '3': {
      statusId: '3',
      statusCode: 'BG_REJECTED',
      statusTypeId: '1',
      sequenceId: 3,
      hasTable: '0',
      description: 'BG_REJECTED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '4': {
      statusId: '4',
      statusCode: 'BG_REVIEWED',
      statusTypeId: '1',
      sequenceId: 4,
      hasTable: '0',
      description: 'BG_REVIEWED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '5': {
      statusId: '5',
      statusCode: 'BOUNCED',
      statusTypeId: '1',
      sequenceId: 5,
      hasTable: '0',
      description: 'BOUNCED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '6': {
      statusId: '6',
      statusCode: 'CANCELLED',
      statusTypeId: '1',
      sequenceId: 6,
      hasTable: '0',
      description: 'CANCELLED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '7': {
      statusId: '7',
      statusCode: 'COMPLETE',
      statusTypeId: '1',
      sequenceId: 7,
      hasTable: '0',
      description: 'COMPLETE',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '8': {
      statusId: '8',
      statusCode: 'ENTERED',
      statusTypeId: '1',
      sequenceId: 8,
      hasTable: '0',
      description: 'ENTERED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '9': {
      statusId: '9',
      statusCode: 'IN_PROGRESS',
      statusTypeId: '1',
      sequenceId: 9,
      hasTable: '0',
      description: 'IN_PROGRESS',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '10': {
      statusId: '10',
      statusCode: 'PENDING',
      statusTypeId: '1',
      sequenceId: 10,
      hasTable: '0',
      description: 'PENDING',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '11': {
      statusId: '11',
      statusCode: 'REFERRED',
      statusTypeId: '1',
      sequenceId: 11,
      hasTable: '0',
      description: 'REFERRED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '12': {
      statusId: '12',
      statusCode: 'RESOLVED',
      statusTypeId: '1',
      sequenceId: 12,
      hasTable: '0',
      description: 'RESOLVED',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    },
    '13': {
      statusId: '13',
      statusCode: 'UNKNOWN_PARTY',
      statusTypeId: '1',
      sequenceId: 13,
      hasTable: '0',
      description: 'UNKNOWN_PARTY',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0'
    }
  },
  quantityBreak: {

  },
}


function findAll(req, res) {
  const { type } = req.params
  const data = dataSource[type] || {}
  res.json(Object.keys(data).map(key => data[key]))
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
  findAll(req, res)
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
  findAll(req, res)
}

function remove(req, res) {
  const { type, key } = req.params
  delete dataSource[type][key]
  res.end()
}

export default {
  'GET /api/infra/:type': findAll,
  'GET /api/infra/:type/:key': findOne,
  'POST /api/infra/:type': save,
  'PUT /api/infra/:type/:key': update,
  'DELETE /api/infra/:type/:key': remove,
}