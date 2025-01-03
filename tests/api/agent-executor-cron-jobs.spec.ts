import {
  listAllAgentExecutorCronJobs,
  getAgentExecutorCronJobById,
  createAgentExecutorCronJob,
  updateAgentExecutorCronJob,
  deleteAgentExecutorCronJob,
} from '../../src/api/agent-executor-cron-jobs';
import {
  IAgentExecutorCronJob,
  ICreateAgentExecutorCronJobInput,
  IUpdateAgentExecutorCronJobInput,
  IRawPaginatedResponse,
} from '../../src/types';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { AGENT_EXECUTOR_CRON_JOBS_API, CREATE_METHOD, DELETE_METHOD, UPDATE_METHOD } from '../../src/utils/constants';
import { PaginatedResponseHandler } from '../../src/utils/PaginatedResponseHandler';
import { AgentExecutorCronJobStatusEnum } from '../../src/types/AgentExecutorCronJob/AgentExecutorCronJobStatusEnum';
import { AgentExecutorCronJob } from '../../src/models';

jest.mock('../../src/utils/UnifiedApiClient');

describe('AgentExecutorCronJob API', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;
  const mockCronJob: IAgentExecutorCronJob = {
    id: 'cron-job-id',
    agent_id: 'agent-id',
    name: 'Test Cron Job',
    status: AgentExecutorCronJobStatusEnum.RUNNING,
    expression: 'expression',
    execution_stream_address: 'execution',
    modified: '2024-01-01T00:00:00Z',
    created: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClientMock = {
      api: {
        request: jest.fn(),
      },
    } as unknown as jest.Mocked<UnifiedApiClient>;
  });

  describe('listAllAgentExecutorCronJobs', () => {
    it('should list all agent executor cron jobs', async () => {
      const mockResponse: IRawPaginatedResponse<IAgentExecutorCronJob> = {
        results: [],
        total_count: 0,
        current_page: 1,
        next: null,
        previous: null,
      };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = (await listAllAgentExecutorCronJobs(unifiedApiClientMock)).getCurrentResponse();

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENT_EXECUTOR_CRON_JOBS_API}/`);
      expect(result).toEqual({
        results: mockResponse.results,
        totalCount: mockResponse.total_count,
        currentPage: mockResponse.current_page,
        hasNextPage: false,
        hasPreviousPage: false,
        nextPage: null,
        previousPage: null,
      });
    });
  });

  describe('getAgentExecutorCronJobById', () => {
    it('should get an agent executor cron job by ID', async () => {
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockCronJob);

      const result = await getAgentExecutorCronJobById(unifiedApiClientMock, 'cron-job-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENT_EXECUTOR_CRON_JOBS_API}/cron-job-id/`);
      expect(result).toBeInstanceOf(AgentExecutorCronJob);
      expect(result.getData()).toEqual(mockCronJob);
    });
  });

  describe('createAgentExecutorCronJob', () => {
    it('should create an agent executor cron job', async () => {
      const mockInput: ICreateAgentExecutorCronJobInput = {
        agent_id: 'agent-id',
        name: 'Test Cron Job',
        expression: 'expression',
      };

      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockCronJob);

      const result = await createAgentExecutorCronJob(unifiedApiClientMock, mockInput);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(
        `${AGENT_EXECUTOR_CRON_JOBS_API}/${CREATE_METHOD}`,
        {
          method: 'POST',
          body: JSON.stringify(mockInput),
        }
      );
      expect(result).toBeInstanceOf(AgentExecutorCronJob);
      expect(result.getData()).toEqual(mockCronJob);
    });
  });

  describe('updateAgentExecutorCronJob', () => {
    it('should update an agent executor cron job', async () => {
      const mockUpdate: IUpdateAgentExecutorCronJobInput = { name: 'Updated Cron Job' };

      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockCronJob);

      const result = await updateAgentExecutorCronJob(unifiedApiClientMock, 'cron-job-id', mockUpdate);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(
        `${AGENT_EXECUTOR_CRON_JOBS_API}/cron-job-id/${UPDATE_METHOD}`,
        {
          method: 'PATCH',
          body: JSON.stringify(mockUpdate),
        }
      );
      expect(result).toBeInstanceOf(AgentExecutorCronJob);
      expect(result.getData()).toEqual(mockCronJob);
    });
  });

  describe('deleteAgentExecutorCronJob', () => {
    it('should delete an agent executor cron job', async () => {
      const mockCronJobId = 'cron-job-id';

      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(undefined);

      await deleteAgentExecutorCronJob(unifiedApiClientMock, mockCronJobId);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(
        `${AGENT_EXECUTOR_CRON_JOBS_API}/cron-job-id/${DELETE_METHOD}`,
        {
          method: 'DELETE',
        }
      );
    });
  });
});
