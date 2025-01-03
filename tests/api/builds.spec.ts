import { listAllBuilds, getBuildById } from '../../src/api/builds';
import { BuildStatusEnum, IBuild, IRawPaginatedResponse } from '../../src/types';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { BUILDS_API } from '../../src/utils/constants';
import { PaginatedResponseHandler } from '../../src/utils/PaginatedResponseHandler';

jest.mock('../../src/utils/UnifiedApiClient');

describe('builds API', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClientMock = {
      api: {
        request: jest.fn(),
      },
    } as unknown as jest.Mocked<UnifiedApiClient>;
  });

  describe('listAllBuilds', () => {
    it('should list all builds', async () => {
      const mockResponse: IRawPaginatedResponse<IBuild> = {
        results: [],
        total_count: 0,
        current_page: 1,
        next: null,
        previous: null,
      };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = await listAllBuilds(unifiedApiClientMock);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${BUILDS_API}/`);
      expect(result).toBeInstanceOf(PaginatedResponseHandler);
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
  });

  describe('getBuildById', () => {
    it('should get a build by ID', async () => {
      const mockBuild: IBuild = {
        id: 'build-id',
        agent_builder_job_id: 'agent-builder-job-id',
        status: BuildStatusEnum.SUCCESS,
        logs: {},
        created: '2024-01-01T00:00:00Z',
      };

      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockBuild);

      const result = await getBuildById(unifiedApiClientMock, 'build-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${BUILDS_API}/build-id/`);
      expect(result).toEqual(mockBuild);
    });
  });
});
