import { stringify } from 'qs';
import request from '@/utils/request';

export async function getList(type, params) {
  return request(`/api/infra/${type}?${stringify(params)}`);
}

export async function getByUnionId(type, key) {
  return request(`/api/infra/union/${type}/${key}`);
}

export async function getByField(type, params) {
  return request(`/api/infra/field/${type}?${stringify(params)}`);
}

export async function save(type, params) {
  return request(`/api/infra/${type}`, {
    method: 'POST',
    body: params,
  });
}

export async function saveUnion(type, params) {
  return request(`/api/infra/union/${type}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(type, key, params) {
  return request(`/api/infra/${type}/${key}`, {
    method: 'PUT',
    body: params,
  });
}

export async function remove(type, key) {
  return request(`/api/infra/${type}/${key}`, {
    method: 'DELETE',
  });
}