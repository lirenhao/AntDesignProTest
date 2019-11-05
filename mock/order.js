import path from 'path';
import jsonfile from 'jsonfile';

const productPath = path.resolve('mock/data/product.json');
const pricePath = path.resolve('mock/data/price.json');

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

export default {
  'POST /api/order/queryProduct': queryProduct,
  'POST /api/order/queryPrice': queryPrice,
};
