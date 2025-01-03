import { IRawPaginatedResponse, IBuild } from '../types';
import { BUILDS_API } from '../utils/constants';
import { PaginatedResponseHandler } from '../utils/PaginatedResponseHandler';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export async function listAllBuilds(unifiedApiClient: UnifiedApiClient): Promise<PaginatedResponseHandler<IBuild>> {
  const response: IRawPaginatedResponse<IBuild> = await unifiedApiClient.api.request(`${BUILDS_API}/`);
  return new PaginatedResponseHandler(unifiedApiClient, response);
}

export async function getBuildById(unifiedApiClient: UnifiedApiClient, id: string): Promise<IBuild> {
  return unifiedApiClient.api.request(`${BUILDS_API}/${id}/`);
}
