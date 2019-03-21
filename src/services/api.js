import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

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