import { Agent } from '../models/Agent';
import { IRawPaginatedResponse, IAgent, ICreateAgentInput, IUpdateAgentInput } from '../types';
import { AGENTS_API, CREATE_METHOD, DELETE_METHOD, UPDATE_METHOD } from '../utils/constants';
import { PaginatedResponseHandler } from '../utils/PaginatedResponseHandler';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export async function listAllAgents(unifiedApiClient: UnifiedApiClient): Promise<PaginatedResponseHandler<IAgent>> {
  const response: IRawPaginatedResponse<IAgent> = await unifiedApiClient.api.request(`${AGENTS_API}/`);
  return new PaginatedResponseHandler(unifiedApiClient, response);
}

export async function getAgentById(unifiedApiClient: UnifiedApiClient, id: string): Promise<Agent> {
  const response: IAgent = await unifiedApiClient.api.request(`${AGENTS_API}/${id}/`);
  return new Agent(unifiedApiClient, response);
}

export async function createAgent(unifiedApiClient: UnifiedApiClient, agent: ICreateAgentInput): Promise<Agent> {
  const response: IAgent = await unifiedApiClient.api.request<IAgent>(`${AGENTS_API}/${CREATE_METHOD}`, {
    method: 'POST',
    body: JSON.stringify(agent),
  });
  return new Agent(unifiedApiClient, response);
}

export async function updateAgent(
  unifiedApiClient: UnifiedApiClient,
  id: string,
  agent: IUpdateAgentInput
): Promise<Agent> {
  const response: IAgent = await unifiedApiClient.api.request(`${AGENTS_API}/${id}/${UPDATE_METHOD}`, {
    method: 'PATCH',
    body: JSON.stringify(agent),
  });
  return new Agent(unifiedApiClient, response);
}

export async function deleteAgent(unifiedApiClient: UnifiedApiClient, id: string): Promise<void> {
  await unifiedApiClient.api.request(`${AGENTS_API}/${id}/${DELETE_METHOD}`, {
    method: 'DELETE',
  });
}
