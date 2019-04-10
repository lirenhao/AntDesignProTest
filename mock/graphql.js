import path from 'path';
import jsonfile from 'jsonfile';
import graphqlHTTP from 'express-graphql';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';

const typeFile = path.join(__dirname, './data/type.json');
const productFile = path.join(__dirname, './data/product.json');

const productTypeDefs = importSchema(path.join(__dirname, './schema/product.graphql'));

const productResolvers = {
  Query: {
    member: (_, { categoryId }) => {
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

const productSchema = makeExecutableSchema({
  typeDefs: productTypeDefs,
  resolvers: productResolvers,
});

const testTypeDefs = importSchema(path.join(__dirname, './schema/test.graphql'));

const testResolvers = {
  Query: {
    hello: () => 'this is test',
    user: (_, { id }) => ({ id, name: 'test' }),
  },
};

const testSchema = makeExecutableSchema({ typeDefs: testTypeDefs, resolvers: testResolvers });

const schema = mergeSchemas({ schemas: [productSchema, testSchema] });

export default {
  'GET /api/graphql': graphqlHTTP({ schema, graphiql: true }),
  'POST /api/graphql': graphqlHTTP({ schema }),
};
