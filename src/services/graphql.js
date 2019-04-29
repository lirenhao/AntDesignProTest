import client from '@/utils/client';

export async function query(gql, variables) {
  return client.query(gql, variables);
}

export async function mutate(gql, variables) {
  return client.mutate(gql, variables);
}
