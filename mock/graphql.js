import path from 'path';
import jsonfile from 'jsonfile';
import graphqlHTTP from 'express-graphql';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

const typeFile = path.join(__dirname, './data/type.json');
const productFile = path.join(__dirname, './data/product.json');

const typeDefs = importSchema(path.join(__dirname, './schema/product.graphql'));

const resolvers = {
  Query: {
    member: (_, { productId, categoryId }) => {
      console.log(productId, categoryId);
      return jsonfile.readFile(productFile).then(({ categoryMember }) =>
        Object.keys(categoryMember)
          .map(key => categoryMember[key])
          .filter(item => categoryId && item.productCategoryId === categoryId)
      );
    },
    hello: () => 'test',
  },
  ProductCategoryMember: {
    productCategory: menber =>
      jsonfile
        .readFile(productFile)
        .then(({ category }) => category[menber.productCategoryId] || {}),
    product: menber =>
      jsonfile.readFile(productFile).then(({ product }) => product[menber.productId] || {}),
  },
  Product: {
    productType: ({ productTypeId }) =>
      jsonfile.readFile(typeFile).then(({ productType }) => productType[productTypeId] || {}),
    primaryProductCategory: ({ primaryProductCategoryId }) =>
      jsonfile
        .readFile(productFile)
        .then(({ category }) => category[primaryProductCategoryId] || {}),
  },
  ProductCategory: {
    productCategoryType: ({ productCategoryTypeId }) =>
      jsonfile
        .readFile(typeFile)
        .then(({ productCategoryType }) => productCategoryType[productCategoryTypeId] || {}),
  },
};

export default {
  'GET /api/graphql': graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
  }),
  'POST /api/graphql': graphqlHTTP({ schema: makeExecutableSchema({ typeDefs, resolvers }) }),
};
