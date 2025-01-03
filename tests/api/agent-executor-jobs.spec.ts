import {
  listAllAgentExecutorJobs,
  getAgentExecutorJobById,
  createAgentExecutorJob,
} from '../../src/api/agent-executor-jobs';
import { IAgentExecutorJob, ICreateAgentExecutorJobInput, IRawPaginatedResponse } from '../../src/types';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { AGENT_EXECUTOR_JOBS_API, CREATE_METHOD } from '../../src/utils/constants';

jest.mock('../../src/utils/UnifiedApiClient');

describe('agent-executor-jobs API', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClientMock = {
      api: {
        request: jest.fn(),
      },
    } as unknown as jest.Mocked<UnifiedApiClient>;
  });

  describe('listAllAgentExecutorJobs', () => {
    it('should list all agent executor jobs', async () => {
      const mockResponse: IRawPaginatedResponse<IAgentExecutorJob> = {
        results: [],
        total_count: 0,
        current_page: 1,
        next: null,
        previous: null,
      };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = (await listAllAgentExecutorJobs(unifiedApiClientMock)).getCurrentResponse();

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENT_EXECUTOR_JOBS_API}/`);
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

  describe('getAgentExecutorJobById', () => {
    it('should get an agent executor job by ID', async () => {
      const mockJob: IAgentExecutorJob = {
        id: 'job-id',
        agent_id: 'agent-id',
        execution_address: 'execution-address',
        created: '2024-01-01T00:00:00Z',
      };

      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockJob);

      const result = await getAgentExecutorJobById(unifiedApiClientMock, 'job-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENT_EXECUTOR_JOBS_API}/job-id/`);
      expect(result).toEqual(mockJob);
    });
  });

  describe('createAgentExecutorJob', () => {
    it('should create an agent executor job', async () => {
      const mockInput: ICreateAgentExecutorJobInput = { agent_id: 'agent-id', payload: {} };
      const mockJob: IAgentExecutorJob = {
        id: 'new-job-id',
        agent_id: 'agent-id',
        execution_address: 'execution-address',
        created: '2024-01-01T00:00:00Z',
      };

      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockJob);

      const result = await createAgentExecutorJob(unifiedApiClientMock, mockInput);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENT_EXECUTOR_JOBS_API}/${CREATE_METHOD}`, {
        method: 'POST',
        body: JSON.stringify(mockInput),
      });
      expect(result).toEqual(mockJob);
    });
  });
});
