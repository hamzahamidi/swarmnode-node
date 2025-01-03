import { IRawPaginatedResponse, IStore, ICreateStoreInput, IUpdateStoreInput } from '../types';
import { STORES_API, CREATE_METHOD, DELETE_METHOD, UPDATE_METHOD } from '../utils/constants';
import { PaginatedResponseHandler } from '../utils/PaginatedResponseHandler';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export async function listAllStores(unifiedApiClient: UnifiedApiClient): Promise<PaginatedResponseHandler<IStore>> {
  const response: IRawPaginatedResponse<IStore> = await unifiedApiClient.api.request(`${STORES_API}/`);
  return new PaginatedResponseHandler(unifiedApiClient, response);
}

export async function getStoreById(unifiedApiClient: UnifiedApiClient, id: string): Promise<IStore> {
  return unifiedApiClient.api.request(`${STORES_API}/${id}/`);
}

export async function createStore(unifiedApiClient: UnifiedApiClient, store: ICreateStoreInput): Promise<IStore> {
  return unifiedApiClient.api.request(`${STORES_API}/${CREATE_METHOD}`, {
    method: 'POST',
    body: JSON.stringify(store),
  });
}

export async function updateStore(
  unifiedApiClient: UnifiedApiClient,
  id: string,
  store: IUpdateStoreInput
): Promise<IStore> {
  return unifiedApiClient.api.request(`${STORES_API}/${id}/${UPDATE_METHOD}`, {
    method: 'PATCH',
    body: JSON.stringify(store),
  });
}

export async function deleteStore(unifiedApiClient: UnifiedApiClient, id: string): Promise<void> {
  await unifiedApiClient.api.request(`${STORES_API}/${id}/${DELETE_METHOD}`, {
    method: 'DELETE',
  });
}
