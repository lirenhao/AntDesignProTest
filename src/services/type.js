import request from '@/utils/request';
import client from '@/utils/client';
import { ProudctMember, UpHello } from './graphql/product.gql';

client.query(ProudctMember, { categoryId: '1' }).then(console.log);
client.mutate(UpHello, { hello: '1', user: { name: 'test' } }).then(console.log);

export async function findAll() {
  return request(`/api/type`);
}

export async function findType(type) {
  return request(`/api/type/${type}`);
}

export async function saveType(type, params) {
  return request(`/api/type/${type}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateType(type, key, params) {
  return request(`/api/type/${type}/${key}`, {
    method: 'PUT',
    body: params,
  });
}

export async function removeType(type, key) {
  return request(`/api/type/${type}/${key}`, {
    method: 'DELETE',
  });
}
