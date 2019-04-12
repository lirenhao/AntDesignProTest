import moment from 'moment'
import path from 'path'
import jsonfile from 'jsonfile'

let index = 100
const file = path.resolve('mock/data/type.json')

function findAll(req, res) {
  jsonfile.readFile(file)
    .then(dataSource => {
      res.json(dataSource)
    })
    .catch(error => res.status(500).send(error))
}

function find(req, res) {
  const { type } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      const data = dataSource[type]
      res.json(data)
    })
    .catch(error => res.status(500).send(error))
}

function save(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type } = req.params
  console.log(type, body)
  const key = index.toString()
  index += 1
  jsonfile.readFile(file)
    .then(dataSource => {
      dataSource[type][key] = {
        ...body,
        [body.id]: key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      }
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 })
      find(req, res)
    })
    .catch(error => res.status(500).send(error))
}

function update(req, res, u, b) {
  const body = (b && b.body) || req.body
  const { type, key } = req.params
  jsonfile.readFile(file)
    .then(dataSource => {
      dataSource[type][key] = {
        ...body,
        [body.id]: key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 })
      find(req, res)
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

export default {
  'GET /api/type': findAll,
  'GET /api/type/:type': find,
  'POST /api/type/:type': save,
  'PUT /api/type/:type/:key': update,
  'DELETE /api/type/:type/:key': remove,
}