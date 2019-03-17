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

export async function queryProductType(params) {
  return request(`/api/productType?${stringify(params)}`);
}

export async function addProductType(params) {
  return request('/api/productType', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryProduct(params) {
  return request(`/api/product?${stringify(params)}`);
}

export async function addProduct(params) {
  return request('/api/product', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryProductAssocType(params) {
  return request(`/api/productAssocType?${stringify(params)}`);
}

export async function addProductAssocType(params) {
  return request('/api/productAssocType', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryProductCategoryType(params) {
  return request(`/api/productCategoryType?${stringify(params)}`);
}

export async function queryProductCategory(params) {
  return request(`/api/productCategory?${stringify(params)}`);
}

export async function addProductCategory(params) {
  return request('/api/productCategory', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryProductFeatureType(params) {
  return request(`/api/productFeatureType?${stringify(params)}`);
}

export async function addProductFeatureType(params) {
  return request('/api/productFeatureType', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryProductFeature(params) {
  return request(`/api/productFeature?${stringify(params)}`);
}

export async function addProductFeature(params) {
  return request('/api/productFeature', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryProductFeatureIactnType(params) {
  return request(`/api/productFeatureIactnType?${stringify(params)}`);
}

export async function queryProductFeatureApplType(params) {
  return request(`/api/productFeatureApplType?${stringify(params)}`);
}

export async function queryProductPriceType(params) {
  return request(`/api/productPriceType?${stringify(params)}`);
}

export async function queryProductPricePurpose(params) {
  return request(`/api/productPricePurpose?${stringify(params)}`);
}
