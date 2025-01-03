import { listAllExecutions, getExecutionById, listenToExecution, streamExecutions } from '../../src/api/executions';
import { ExecutionStatusEnum, IExecution, IRawPaginatedResponse } from '../../src/types';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { EXECUTIONS_API, EXECUTION_API, EXECUTIONS_STREAM_API } from '../../src/utils/constants';
import { PaginatedResponseHandler } from '../../src/utils/PaginatedResponseHandler';

jest.mock('../../src/utils/UnifiedApiClient');

describe('executions API', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;
  const mockExecution: IExecution = {
    id: 'execution-id',
    agent_id: 'agent-id',
    agent_executor_job_id: 'agent-executor-job-id',
    agent_executor_cron_job_id: 'agent-executor-cron-job-id',
    status: ExecutionStatusEnum.SUCCESS,
    start: '2024-01-01T00:00:00Z',
    finish: '2024-01-01T00:00:00Z',
    logs: 'logs',
    return_value: 'return-value',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClientMock = {
      api: {
        request: jest.fn(),
      },
      websocket: {
        listen: jest.fn(),
        stream: jest.fn(),
      },
    } as unknown as jest.Mocked<UnifiedApiClient>;
  });

  describe('listAllExecutions', () => {
    it('should list all executions', async () => {
      const mockResponse: IRawPaginatedResponse<IExecution> = {
        results: [],
        total_count: 0,
        current_page: 1,
        next: null,
        previous: null,
      };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = (await listAllExecutions(unifiedApiClientMock)).getCurrentResponse();

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${EXECUTIONS_API}/`);
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

  describe('getExecutionById', () => {
    it('should get an execution by ID', async () => {
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockExecution);

      const result = await getExecutionById(unifiedApiClientMock, 'execution-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${EXECUTIONS_API}/execution-id/`);
      expect(result).toEqual(mockExecution);
    });
  });

  describe('listenToExecution', () => {
    it('should listen to an execution', async () => {
      (unifiedApiClientMock.websocket.listen as jest.Mock).mockResolvedValue(mockExecution);

      const result = await listenToExecution(unifiedApiClientMock, 'execution-address');

      expect(unifiedApiClientMock.websocket.listen).toHaveBeenCalledWith(`${EXECUTION_API}/execution-address`);
      expect(result).toEqual(mockExecution);
    });
  });

  describe('streamExecutions', () => {
    it('should stream executions', async () => {
      const mockStream = {
        id: 'execution-id',
        status: 'STREAMING',
        logs: {},
        created: '2024-01-01T00:00:00Z',
      };

      (unifiedApiClientMock.websocket.stream as jest.Mock).mockResolvedValue(mockStream);

      const stream = streamExecutions(unifiedApiClientMock, 'stream-address');

      const result = (await stream.next()).value;

      expect(unifiedApiClientMock.websocket.stream).toHaveBeenCalledWith(`${EXECUTIONS_STREAM_API}/stream-address`);
      expect(result).toEqual(mockStream);
    });
  });
});
