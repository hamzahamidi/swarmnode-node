import { IRawPaginatedResponse, IAgentExecutorJob, ICreateAgentExecutorJobInput } from '../types';
import { AGENT_EXECUTOR_JOBS_API, CREATE_METHOD } from '../utils/constants';
import { PaginatedResponseHandler } from '../utils/PaginatedResponseHandler';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export async function listAllAgentExecutorJobs(
  unifiedApiClient: UnifiedApiClient
): Promise<PaginatedResponseHandler<IAgentExecutorJob>> {
  const response: IRawPaginatedResponse<IAgentExecutorJob> = await unifiedApiClient.api.request(
    `${AGENT_EXECUTOR_JOBS_API}/`
  );
  return new PaginatedResponseHandler(unifiedApiClient, response);
}

export async function getAgentExecutorJobById(
  unifiedApiClient: UnifiedApiClient,
  id: string
): Promise<IAgentExecutorJob> {
  return unifiedApiClient.api.request(`${AGENT_EXECUTOR_JOBS_API}/${id}/`);
}

export async function createAgentExecutorJob(
  unifiedApiClient: UnifiedApiClient,
  agent: ICreateAgentExecutorJobInput
): Promise<IAgentExecutorJob> {
  return unifiedApiClient.api.request(`${AGENT_EXECUTOR_JOBS_API}/${CREATE_METHOD}`, {
    method: 'POST',
    body: JSON.stringify(agent),
  });
}
