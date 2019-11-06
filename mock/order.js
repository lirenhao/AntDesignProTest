import path from 'path';
import jsonfile from 'jsonfile';

const productPath = path.resolve('mock/data/product.json');
const pricePath = path.resolve('mock/data/price.json');
const orderPath = path.resolve('mock/data/order.json');

let index = 100;

function queryProduct(req, res, u, b) {
  const { productTypeId, productCategotyId } = (b && b.body) || req.body;
  jsonfile
    .readFile(productPath)
    .then(dataSource => {
      const products = Object.keys(dataSource.product).map(key => dataSource.product[key]);
      res.json(
        products.filter(
          item =>
            item.productCategotyId === productCategotyId && item.productTypeId === productTypeId
        )
      );
    })
    .catch(error => res.status(500).send(error));
}

function queryPrice(req, res, u, b) {
  const { productId } = (b && b.body) || req.body;
  jsonfile
    .readFile(pricePath)
    .then(dataSource => {
      res.json(dataSource[productId]);
    })
    .catch(error => res.status(500).send(error));
}

function find(req, res) {
  jsonfile
    .readFile(orderPath)
    .then(dataSource => {
      res.json(Object.keys(dataSource).map(id => dataSource[id]));
    })
    .catch(error => res.status(500).send(error));
}

function save(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const key = index.toString();
  index += 1;
  jsonfile
    .readFile(orderPath)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      dataSource[key] = {
        ...body,
        orderId: key,
      };
      jsonfile.writeFileSync(orderPath, dataSource, { spaces: 2 });
      find(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function update(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const { key } = req.params;
  jsonfile
    .readFile(orderPath)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      dataSource[key] = {
        ...body,
      };
      jsonfile.writeFileSync(orderPath, dataSource, { spaces: 2 });
      find(req, res, u);
    })
    .catch(error => res.status(500).send(error));
}

function remove(req, res) {
  const { key } = req.params;
  jsonfile
    .readFile(orderPath)
    .then(dataSource => {
      // eslint-disable-next-line no-param-reassign
      delete dataSource[key];
      jsonfile.writeFileSync(orderPath, dataSource, { spaces: 2 });
      find(req, res);
    })
    .catch(error => res.status(500).send(error));
}

export default {
  'POST /api/order/queryProduct': queryProduct,
  'POST /api/order/queryPrice': queryPrice,
  'GET /api/order': find,
  'POST /api/order': save,
  'PUT /api/order/:key': update,
  'DELETE /api/order/:key': remove,
};
