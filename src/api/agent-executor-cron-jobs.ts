import { AgentExecutorCronJob } from '../models/AgentExecutorCronJob';
import {
  IRawPaginatedResponse,
  IAgentExecutorCronJob,
  ICreateAgentExecutorCronJobInput,
  IUpdateAgentExecutorCronJobInput,
} from '../types';
import { AGENT_EXECUTOR_CRON_JOBS_API, CREATE_METHOD, DELETE_METHOD, UPDATE_METHOD } from '../utils/constants';
import { PaginatedResponseHandler } from '../utils/PaginatedResponseHandler';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export async function listAllAgentExecutorCronJobs(
  unifiedApiClient: UnifiedApiClient
): Promise<PaginatedResponseHandler<IAgentExecutorCronJob>> {
  const response = await unifiedApiClient.api.request<IRawPaginatedResponse<IAgentExecutorCronJob>>(
    `${AGENT_EXECUTOR_CRON_JOBS_API}/`
  );
  return new PaginatedResponseHandler(unifiedApiClient, response);
}

export async function getAgentExecutorCronJobById(
  unifiedApiClient: UnifiedApiClient,
  id: string
): Promise<AgentExecutorCronJob> {
  const response = await unifiedApiClient.api.request<IAgentExecutorCronJob>(`${AGENT_EXECUTOR_CRON_JOBS_API}/${id}/`);
  return new AgentExecutorCronJob(unifiedApiClient, response);
}

export async function createAgentExecutorCronJob(
  unifiedApiClient: UnifiedApiClient,
  agent: ICreateAgentExecutorCronJobInput
): Promise<AgentExecutorCronJob> {
  const response = await unifiedApiClient.api.request<IAgentExecutorCronJob>(
    `${AGENT_EXECUTOR_CRON_JOBS_API}/${CREATE_METHOD}`,
    {
      method: 'POST',
      body: JSON.stringify(agent),
    }
  );
  return new AgentExecutorCronJob(unifiedApiClient, response);
}

export async function updateAgentExecutorCronJob(
  unifiedApiClient: UnifiedApiClient,
  id: string,
  agent: IUpdateAgentExecutorCronJobInput
): Promise<AgentExecutorCronJob> {
  const response = await unifiedApiClient.api.request<IAgentExecutorCronJob>(
    `${AGENT_EXECUTOR_CRON_JOBS_API}/${id}/${UPDATE_METHOD}`,
    {
      method: 'PATCH',
      body: JSON.stringify(agent),
    }
  );
  return new AgentExecutorCronJob(unifiedApiClient, response);
}

export async function deleteAgentExecutorCronJob(unifiedApiClient: UnifiedApiClient, id: string): Promise<void> {
  await unifiedApiClient.api.request(`${AGENT_EXECUTOR_CRON_JOBS_API}/${id}/${DELETE_METHOD}`, {
    method: 'DELETE',
  });
}
