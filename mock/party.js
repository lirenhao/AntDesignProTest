import moment from 'moment'

let index = 100

const dataSource = {
  // 当事人
  party: {
    "1": {
      partyId: "1",
      partyTypeId: "1",
    },
    "2": {
      partyId: "2",
      partyTypeId: "2",
    },
  },
  // 个人
  partyPerson: {
    "1": {
      partyId: "1",
      firstName:"firstName",
      middleName:"middleName",
      lastName:"lastName",
      personalTitle:"头衔",
      nickName:"昵称",
      genderTypeId: "1",
      birthDate:"2019-03-17",
      maritalStatus:"0",
      defaultPartyIdentificationTypeId: "1",
      totalYearsWorkExperience:"总的工作年限",
      employmentStatusId:"雇佣状态标识",
      residenceStatusId:"居住状态标识",
      description: "个人",
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  // 组织
  partyGroup: {
    "2": {
      partyId:"2", 
      parentId: "",
      groupName:"小小创业", 
      comments:"小小创业", 
      logoUrl: "",
      termOfOperationFromDate: '',
      termOfOperationThruDate: '',
      establishmentDate: '',
      registeredCaptial:'10000',
      numberOfInsuredPersons: '10',
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  partyCategoryGroup: {
    "1": {
      partyCategoryGroupId: "1",
      partyCategoryTypeId: "1",
      parentGroupId: "",
      description: "类别组",
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  partyCategoryRollup: {
    "1": {
      partyCategoryId: "1",
      parentCategoryId: "",
      fromDate: "2019-03-17",
      thruDate: "2019-03-17",
      sequenceNum: "1",
      lastUpdatedStamp: '2019-03-17 11:39:38',
      createdStamp: '2019-03-17 10:39:38',
      version: 'v1.0.0',
    },
  },
  partyRelationship: {
  }
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

function findByUnionId(req, res) {
  const { type, key: unionId } = req.params
  const data = dataSource[type] || {}
  return res.json(Object.keys(data).filter(key => key.split('-')[0] === unionId).map(key => data[key]))
}

function saveUnion(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type } = req.params
  const data = dataSource[type] || {}
  data[body.key] = {
    ...body,
    lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    version: 'v1.0.0',
  }
  dataSource[type] = data
  req.params.key = body.key.split('-')[0] || ''
  findByUnionId(req, res)
}

export default {
  'GET /api/party/union/:type/:key': findByUnionId,
  'POST /api/party/union/:type': saveUnion,
  'GET /api/party/:type': findAll,
  'GET /api/party/:type/:key': findOne,
  'POST /api/party/:type': save,
  'PUT /api/party/:type/:key': update,
  'DELETE /api/party/:type/:key': remove,
}