import client from '@/utils/client'

export async function query(query, variables) {
  return client.query(query, variables)
}

export async function mutate(productId) {
  return client.mutate(ProductFeatureIactn, { productId })
}