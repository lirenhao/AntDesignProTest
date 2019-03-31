import moment from 'moment'
import { parse } from 'url'
import path from 'path'
import jsonfile from 'jsonfile'

let index = 100
const file = path.resolve('mock/data/party.json')

function findAll(req, res) {
  const { type } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {}
      res.json(Object.keys(data).map(key => data[key]))
    })
    .catch(error => res.status(500).send(error))
}

function findOne(req, res) {
  const { type, key } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {}
      res.json(data[key])
    })
    .catch(error => res.status(500).send(error))
}

function save(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type } = req.params
  const key = index.toString()
  index += 1  
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {}
      data[key] = {
        ...body,
        [body.id]: key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      }
      dataSource[type] = data
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 })
      findAll(req, res)
    })
    .catch(error => res.status(500).send(error))
}

function update(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type, key } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {}
      data[key] = {
        ...body,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      dataSource[type] = data
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 })
      findAll(req, res)
    })
    .catch(error => res.status(500).send(error))
}

function remove(req, res) {
  const { type, key } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      delete dataSource[type][key]
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 })
      res.end()
    })
    .catch(error => res.status(500).send(error))
}

function findByUnionId(req, res) {
  const { type, key: unionId } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {}
      res.json(Object.keys(data).filter(key => key.split('-')[0] === unionId).map(key => data[key]))
    })
    .catch(error => res.status(500).send(error))
}

function saveUnion(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {}
      data[body.key] = {
        ...body,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      }
      dataSource[type] = data
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 })
      req.params.key = body.key.split('-')[0] || ''
      findByUnionId(req, res)
    })
    .catch(error => res.status(500).send(error))
}

function findByField(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query
  const { type } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {}
      res.json( Object.keys(data).map(key => data[key])
        .filter(item => Object.keys(params).map(key => item[key] === params[key]).reduce((a, b) => a && b, true)
      ))
    })
    .catch(error => res.status(500).send(error))
}

export default {
  'GET /api/party/field/:type': findByField,
  'GET /api/party/union/:type/:key': findByUnionId,
  'POST /api/party/union/:type': saveUnion,
  'GET /api/party/:type': findAll,
  'GET /api/party/:type/:key': findOne,
  'POST /api/party/:type': save,
  'PUT /api/party/:type/:key': update,
  'DELETE /api/party/:type/:key': remove,
}