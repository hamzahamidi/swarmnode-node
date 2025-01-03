import { IRawPaginatedResponse, IAgentBuilderJob } from '../types';
import { AGENT_BUILDER_JOBS_API } from '../utils/constants';
import { PaginatedResponseHandler } from '../utils/PaginatedResponseHandler';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export async function listAllAgentBuilderJobs(
  unifiedApiClient: UnifiedApiClient
): Promise<PaginatedResponseHandler<IAgentBuilderJob>> {
  const response: IRawPaginatedResponse<IAgentBuilderJob> = await unifiedApiClient.api.request(
    `${AGENT_BUILDER_JOBS_API}/`
  );
  return new PaginatedResponseHandler(unifiedApiClient, response);
}

export async function getAgentBuilderJobById(
  unifiedApiClient: UnifiedApiClient,
  id: string
): Promise<IAgentBuilderJob> {
  return unifiedApiClient.api.request(`${AGENT_BUILDER_JOBS_API}/${id}/`);
}
