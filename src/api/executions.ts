import { IRawPaginatedResponse, IExecution } from '../types';
import { EXECUTION_API, EXECUTIONS_API, EXECUTIONS_STREAM_API } from '../utils/constants';
import { PaginatedResponseHandler } from '../utils/PaginatedResponseHandler';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export async function listAllExecutions(
  unifiedApiClient: UnifiedApiClient
): Promise<PaginatedResponseHandler<IExecution>> {
  const response: IRawPaginatedResponse<IExecution> = await unifiedApiClient.api.request(`${EXECUTIONS_API}/`);
  return new PaginatedResponseHandler(unifiedApiClient, response);
}

export async function getExecutionById(unifiedApiClient: UnifiedApiClient, id: string): Promise<IExecution> {
  return unifiedApiClient.api.request(`${EXECUTIONS_API}/${id}/`);
}

export async function listenToExecution(unifiedApiClient: UnifiedApiClient, address: string): Promise<IExecution> {
  return unifiedApiClient.websocket.listen<IExecution>(`${EXECUTION_API}/${address}`);
}

export async function* streamExecutions(unifiedApiClient: UnifiedApiClient, address: string) {
  yield unifiedApiClient.websocket.stream(`${EXECUTIONS_STREAM_API}/${address}`);
}
