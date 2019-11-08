import { parse } from 'url';
import moment from 'moment';
import path from 'path';
import jsonfile from 'jsonfile';

let index = 100;
const file = path.resolve('mock/data/product.json');
const pricePath = path.resolve('mock/data/price.json');

function findAll(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }
  const { type } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {};
      const result = {
        list: Object.keys(data).map(key => data[key]),
        pagination: {
          total: Object.keys(data).length,
          pageSize,
          current: parseInt(params.currentPage, 10) || 1,
        },
      };
      res.json(result);
    })
    .catch(error => res.status(500).send(error));
}

function findOne(req, res) {
  const { type, key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {};
      res.json(data[key]);
    })
    .catch(error => res.status(500).send(error));
}

function save(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const { type } = req.params;
  const key = index.toString();
  index += 1;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {};
      data[key] = {
        ...body,
        productId: key,
      };
      // eslint-disable-next-line no-param-reassign
      dataSource[type] = data;
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      findAll(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function update(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const { type, key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource[type] || {};
      data[key] = {
        ...body,
      };
      // eslint-disable-next-line no-param-reassign
      dataSource[type] = data;
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      // 删除价格
      const prices = jsonfile.readFileSync(pricePath);
      delete prices[key];
      jsonfile.writeFileSync(pricePath, prices, { spaces: 2 });
      findAll(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function remove(req, res) {
  const { type, key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      delete dataSource[type][key];
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      res.end();
    })
    .catch(error => res.status(500).send(error));
}

function findMember(req, res) {
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource.categoryMember;
      const result = Object.keys(data)
        .filter(v => v.split('-')[0] === key)
        .map(v => ({
          ...data[v],
          productName: dataSource.product[data[v].productId].productName,
        }));
      res.json(result);
    })
    .catch(error => res.status(500).send(error));
}

function saveMember(req, res, u, b) {
  const body = (b && b.body) || req.body;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const key = `${body.productCategoryId}-${body.productId}`;
      // eslint-disable-next-line no-param-reassign
      dataSource.categoryMember[key] = {
        ...body,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = body.productCategoryId;
      findMember(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function updateMember(req, res, u, b) {
  const { key } = req.params;
  const body = (b && b.body) || req.body;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      dataSource.categoryMember[key] = {
        ...body,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = key.split('-')[0] || '';
      findMember(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function removeMember(req, res) {
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      delete dataSource.categoryMember[key];
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      res.end();
    })
    .catch(error => res.status(500).send(error));
}

function findFeatureIactn(req, res) {
  const { key: productId } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource.featureIactn;
      const result = Object.keys(data)
        .filter(k => data[k].productId === productId)
        .map(k => ({
          ...data[k],
          key: `${data[k].productFeatureId}-${data[k].productFeatureIdTo}-${data[k].productId}`,
        }));
      res.json(result);
    })
    .catch(error => res.status(500).send(error));
}

function saveFeatureIactn(req, res, u, b) {
  const body = (b && b.body) || req.body;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const key = `${body.productFeatureId}-${body.productFeatureIdTo}-${body.productId}`;
      // eslint-disable-next-line no-param-reassign
      dataSource.featureIactn[key] = {
        ...body,
        key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = body.productId;
      findFeatureIactn(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function removeFeatureIactn(req, res) {
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      delete dataSource.featureIactn[key];
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      res.end();
    })
    .catch(error => res.status(500).send(error));
}

function findFeatureAppl(req, res) {
  const { key: productId } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource.featureAppl;
      const result = Object.keys(data)
        .filter(k => data[k].productId === productId)
        .map(k => ({ ...data[k], key: `${data[k].productFeatureId}-${data[k].productId}` }));
      res.json(result);
    })
    .catch(error => res.status(500).send(error));
}

function saveFeatureAppl(req, res, u, b) {
  const body = (b && b.body) || req.body;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const key = `${body.productFeatureId}-${body.productId}`;
      // eslint-disable-next-line no-param-reassign
      dataSource.featureAppl[key] = {
        ...body,
        key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = body.productId;
      findFeatureAppl(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function removeFeatureAppl(req, res) {
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      delete dataSource.featureAppl[key];
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      res.end();
    })
    .catch(error => res.status(500).send(error));
}

function findPriceComponent(req, res) {
  const { key: productId } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource.priceComponent;
      const result = Object.keys(data)
        .filter(k => data[k].productId === productId)
        .map(k => ({ ...data[k], key: `${data[k].productFeatureId}-${data[k].productId}` }));
      res.json(result);
    })
    .catch(error => res.status(500).send(error));
}

function savePriceComponent(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const key = index.toString();
  index += 1;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      dataSource.priceComponent[key] = {
        ...body,
        productPriceComponentId: key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = body.productId;
      findPriceComponent(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function updatePriceComponent(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource.priceComponent[key];
      // eslint-disable-next-line no-param-reassign
      dataSource.priceComponent[key] = {
        ...data,
        ...body,
        productPriceComponentId: key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = data.productId;
      findPriceComponent(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function removePriceComponent(req, res) {
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      delete dataSource.priceComponent[key];
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      res.end();
    })
    .catch(error => res.status(500).send(error));
}

function findAssoc(req, res) {
  const { key: productAssocTypeId } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource.assoc;
      const result = Object.keys(data)
        .filter(k => data[k].productAssocTypeId === productAssocTypeId)
        .map(k => ({
          ...data[k],
          key: `${data[k].productId}-${data[k].productIdTo}-${data[k].productAssocTypeId}`,
        }));
      res.json(result);
    })
    .catch(error => res.status(500).send(error));
}

function saveAssoc(req, res, u, b) {
  const body = (b && b.body) || req.body;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const key = `${body.productId}-${body.productIdTo}-${body.productAssocTypeId}`;
      // eslint-disable-next-line no-param-reassign
      dataSource.assoc[key] = {
        ...body,
        key,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        version: 'v1.0.0',
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = body.productAssocTypeId;
      findAssoc(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function updateAssoc(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const data = dataSource.assoc[key];
      // eslint-disable-next-line no-param-reassign
      dataSource.priceComponent[key] = {
        ...data,
        ...body,
        lastUpdatedStamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      req.params.key = data.productAssocTypeId;
      findAssoc(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function removeAssoc(req, res) {
  const { key } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      delete dataSource.assoc[key];
      jsonfile.writeFileSync(file, dataSource, { spaces: 2 });
      res.end();
    })
    .catch(error => res.status(500).send(error));
}

export default {
  'GET /api/product/assoc/:key': findAssoc,
  'POST /api/product/assoc': saveAssoc,
  'PUT /api/product/assoc/:key': updateAssoc,
  'DELETE /api/product/assoc/:key': removeAssoc,
  'GET /api/product/member/:key': findMember,
  'POST /api/product/member': saveMember,
  'PUT /api/product/member/:key': updateMember,
  'DELETE /api/product/member/:key': removeMember,
  'GET /api/product/featureIactn/:key': findFeatureIactn,
  'POST /api/product/featureIactn': saveFeatureIactn,
  'DELETE /api/product/featureIactn/:key': removeFeatureIactn,
  'GET /api/product/featureAppl/:key': findFeatureAppl,
  'POST /api/product/featureAppl': saveFeatureAppl,
  'DELETE /api/product/featureAppl/:key': removeFeatureAppl,
  'GET /api/product/priceComponent/:key': findPriceComponent,
  'POST /api/product/priceComponent': savePriceComponent,
  'PUT /api/product/priceComponent/:key': updatePriceComponent,
  'DELETE /api/product/priceComponent/:key': removePriceComponent,
  'GET /api/product/:type': findAll,
  'GET /api/product/:type/:key': findOne,
  'POST /api/product/:type': save,
  'PUT /api/product/:type/:key': update,
  'DELETE /api/product/:type/:key': remove,
};
