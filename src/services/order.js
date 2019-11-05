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
