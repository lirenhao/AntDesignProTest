import request from '@/utils/request';

export async function queryProduct(params) {
  return request('/api/order/queryProduct', {
    method: 'POST',
    body: params,
  });
}

export async function queryPrice(params) {
  return request('/api/order/queryPrice', {
    method: 'POST',
    body: params,
  });
}

export async function findOrder() {
  return request('/api/order');
}

export async function save(params) {
  return request('/api/order', {
    method: 'POST',
    body: params,
  });
}

export async function update(key, params) {
  return request(`/api/order/${key}`, {
    method: 'PUT',
    body: params,
  });
}

export async function remove(key) {
  return request(`/api/order/${key}`, {
    method: 'DELETE',
  });
}
