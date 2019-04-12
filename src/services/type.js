import request from '@/utils/request';

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
