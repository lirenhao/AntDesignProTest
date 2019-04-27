import { stringify } from 'qs';
import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function queryClue(params) {
  return request(`/api/clue?${stringify(params)}`);
}

export async function addClue(params) {
  return request('/api/clue', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function getProductList(type, params) {
  return request(`/api/product/${type}?${stringify(params)}`);
}

export async function getProductInfo(type, key, params) {
  return request(`/api/product/${type}/${key}?${stringify(params)}`);
}

export async function addProduct(type, params) {
  return request(`/api/product/${type}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateProduct(type, key, params) {
  return request(`/api/product/${type}/${key}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'put',
    },
  });
}

export async function deleteProduct(type, key) {
  return request(`/api/product/${type}/${key}`, {
    method: 'DELETE',
  });
}

export async function getProductCategoryMember(key) {
  return request(`/api/product/member/${key}`);
}

export async function addProductCategoryMember(params) {
  return request(`/api/product/member`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateProductCategoryMember(key, params) {
  return request(`/api/product/member/${key}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'put',
    },
  });
}

export async function deleteProductCategoryMember(key) {
  return request(`/api/product/member/${key}`, {
    method: 'DELETE',
  });
}

export async function getProductFeatureIactn(productId) {
  return request(`/api/product/featureIactn/${productId}`);
}

export async function addProductFeatureIactn(params) {
  return request(`/api/product/featureIactn`, {
    method: 'POST',
    body: params,
  });
}

export async function deleteProductFeatureIactn(key) {
  return request(`/api/product/featureIactn/${key}`, {
    method: 'DELETE',
  });
}

export async function getProductFeatureAppl(productId) {
  return request(`/api/product/featureAppl/${productId}`);
}

export async function addProductFeatureAppl(params) {
  return request(`/api/product/featureAppl`, {
    method: 'POST',
    body: params,
  });
}

export async function deleteProductFeatureAppl(key) {
  return request(`/api/product/priceComponent/${key}`, {
    method: 'DELETE',
  });
}

export async function getProductPriceComponent(productId) {
  return request(`/api/product/priceComponent/${productId}`);
}

export async function addProductPriceComponent(params) {
  return request(`/api/product/priceComponent`, {
    method: 'POST',
    body: params,
  });
}

export async function updateProductPriceComponent(key, params) {
  return request(`/api/product/priceComponent/${key}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteProductPriceComponent(key) {
  return request(`/api/product/priceComponent/${key}`, {
    method: 'DELETE',
  });
}

export async function getProductAssoc(assocTypeId) {
  return request(`/api/product/assoc/${assocTypeId}`);
}

export async function addProductAssoc(params) {
  return request(`/api/product/assoc`, {
    method: 'POST',
    body: params,
  });
}

export async function updateProductAssoc(key, params) {
  return request(`/api/product/assoc/${key}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteProductAssoc(key) {
  return request(`/api/product/assoc/${key}`, {
    method: 'DELETE',
  });
}