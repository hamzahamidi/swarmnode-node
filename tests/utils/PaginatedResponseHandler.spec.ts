import { IRawPaginatedResponse } from '../../src/types';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { PaginatedResponseHandler } from '../../src/utils/PaginatedResponseHandler';

jest.mock('../../src/utils/UnifiedApiClient');

describe('PaginatedResponseHandler', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;
  let handler: PaginatedResponseHandler<any>;

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClientMock = {
      api: {
        requestUri: jest.fn(),
      },
    } as unknown as jest.Mocked<UnifiedApiClient>;
  });

  it('should initialize with initial data', () => {
    const mockInitialData: IRawPaginatedResponse<any> = {
      total_count: 100,
      current_page: 1,
      next: 'https://api.example.com/page/2',
      previous: null,
      results: [{ id: 1, name: 'Test Item' }],
    };

    handler = new PaginatedResponseHandler(unifiedApiClientMock, mockInitialData);

    expect(handler.getCurrentResponse()).toEqual({
      totalCount: mockInitialData.total_count,
      currentPage: mockInitialData.current_page,
      nextPage: mockInitialData.next,
      previousPage: mockInitialData.previous,
      results: mockInitialData.results,
      hasNextPage: true,
      hasPreviousPage: false,
    });
  });

  it('should fetch and update pagination for the next page', async () => {
    const mockNextPageData: IRawPaginatedResponse<any> = {
      total_count: 100,
      current_page: 2,
      next: 'https://api.example.com/page/3',
      previous: 'https://api.example.com/page/1',
      results: [{ id: 2, name: 'Next Item' }],
    };

    (unifiedApiClientMock.api.requestUri as jest.Mock).mockResolvedValue(mockNextPageData);

    const mockInitialData: IRawPaginatedResponse<any> = {
      total_count: 100,
      current_page: 1,
      next: 'https://api.example.com/page/2',
      previous: null,
      results: [{ id: 1, name: 'Test Item' }],
    };

    handler = new PaginatedResponseHandler(unifiedApiClientMock, mockInitialData);

    await handler.goToNextPage();

    expect(unifiedApiClientMock.api.requestUri).toHaveBeenCalledWith('https://api.example.com/page/2');
    expect(handler.getCurrentResponse()).toEqual({
      totalCount: mockNextPageData.total_count,
      currentPage: mockNextPageData.current_page,
      nextPage: mockNextPageData.next,
      previousPage: mockNextPageData.previous,
      results: mockNextPageData.results,
      hasNextPage: true,
      hasPreviousPage: true,
    });
  });

  it('should fetch and update pagination for the previous page', async () => {
    const mockPreviousPageData: IRawPaginatedResponse<any> = {
      total_count: 100,
      current_page: 1,
      next: 'https://api.example.com/page/2',
      previous: null,
      results: [{ id: 1, name: 'Previous Item' }],
    };

    (unifiedApiClientMock.api.requestUri as jest.Mock).mockResolvedValue(mockPreviousPageData);

    const mockInitialData: IRawPaginatedResponse<any> = {
      total_count: 100,
      current_page: 2,
      next: 'https://api.example.com/page/3',
      previous: 'https://api.example.com/page/1',
      results: [{ id: 2, name: 'Test Item' }],
    };

    handler = new PaginatedResponseHandler(unifiedApiClientMock, mockInitialData);

    await handler.goToPreviousPage();

    expect(unifiedApiClientMock.api.requestUri).toHaveBeenCalledWith('https://api.example.com/page/1');
    expect(handler.getCurrentResponse()).toEqual({
      totalCount: mockPreviousPageData.total_count,
      currentPage: mockPreviousPageData.current_page,
      nextPage: mockPreviousPageData.next,
      previousPage: mockPreviousPageData.previous,
      results: mockPreviousPageData.results,
      hasNextPage: true,
      hasPreviousPage: false,
    });
  });

  it('should reset pagination data', () => {
    const mockInitialData: IRawPaginatedResponse<any> = {
      total_count: 100,
      current_page: 1,
      next: 'https://api.example.com/page/2',
      previous: null,
      results: [{ id: 1, name: 'Test Item' }],
    };

    handler = new PaginatedResponseHandler(unifiedApiClientMock, mockInitialData);

    handler.resetPagination();

    expect(handler.getCurrentResponse()).toEqual({
      totalCount: 0,
      currentPage: 1,
      nextPage: null,
      previousPage: null,
      results: [],
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });
});
