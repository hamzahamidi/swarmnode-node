import { IRawPaginatedResponse, IAgentBuilderJob } from '../../src/types';
import { AGENT_BUILDER_JOBS_API } from '../../src/utils/constants';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { listAllAgentBuilderJobs, getAgentBuilderJobById } from '../../src/api/agent-builder-jobs';
import { PaginatedResponseHandler } from '../../src/utils/PaginatedResponseHandler';

jest.mock('../../src/utils/UnifiedApiClient');

describe('agent-builder-jobs API', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClientMock = {
      api: {
        request: jest.fn(),
      },
    } as unknown as jest.Mocked<UnifiedApiClient>;
  });

  it('should list all agent builder jobs', async () => {
    const mockResponse: IRawPaginatedResponse<IAgentBuilderJob> = {
      results: [],
      total_count: 0,
      current_page: 1,
      next: null,
      previous: null,
    };
    (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockResponse);

    const result = await listAllAgentBuilderJobs(unifiedApiClientMock);

    expect(result).toBeInstanceOf(PaginatedResponseHandler);

    expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENT_BUILDER_JOBS_API}/`);
    expect(result.getCurrentResponse()).toEqual({
      results: mockResponse.results,
      totalCount: mockResponse.total_count,
      currentPage: mockResponse.current_page,
      hasNextPage: false,
      hasPreviousPage: false,
      nextPage: null,
      previousPage: null,
    });
  });

  it('should get agent builder job by id', async () => {
    const mockJob: IAgentBuilderJob = { id: 'job-id', agent_id: 'agent-id', created: '2021-01-01T00:00:00Z' };

    (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockJob);

    const result = await getAgentBuilderJobById(unifiedApiClientMock, '123');

    expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENT_BUILDER_JOBS_API}/123/`);
    expect(result).toEqual(mockJob);
  });
});
