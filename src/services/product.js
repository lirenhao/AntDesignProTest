import client from '@/utils/client'
import { 
  ProductCategoryMember,
  ProductFeatureIactn,
  ProductFeatureAppl,
} from './graphql/product.gql'

export async function productCategoryMember() {
  return client.query(ProductCategoryMember)
}

export async function productFeatureIactn(productId) {
  return client.query(ProductFeatureIactn, { productId })
}

export async function productFeatureAppl(productId) {
  return client.query(ProductFeatureAppl, { productId })
}