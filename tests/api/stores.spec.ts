import { listAllStores, getStoreById, createStore, updateStore, deleteStore } from '../../src/api/stores';
import { IStore, ICreateStoreInput, IUpdateStoreInput, IRawPaginatedResponse } from '../../src/types';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { STORES_API, CREATE_METHOD, DELETE_METHOD, UPDATE_METHOD } from '../../src/utils/constants';
import { PaginatedResponseHandler } from '../../src/utils/PaginatedResponseHandler';

jest.mock('../../src/utils/UnifiedApiClient');

describe('stores API', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;
  const mockStore: IStore = {
    id: 'new-store-id',
    name: 'New Store',
    data: {},
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

  describe('listAllStores', () => {
    it('should list all stores', async () => {
      const mockResponse: IRawPaginatedResponse<IStore> = {
        results: [],
        total_count: 0,
        current_page: 1,
        next: null,
        previous: null,
      };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = await listAllStores(unifiedApiClientMock);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${STORES_API}/`);
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

  describe('getStoreById', () => {
    it('should get a store by ID', async () => {
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockStore);

      const result = await getStoreById(unifiedApiClientMock, 'store-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${STORES_API}/store-id/`);
      expect(result).toEqual(mockStore);
    });
  });

  describe('createStore', () => {
    it('should create a store', async () => {
      const mockInput: ICreateStoreInput = { name: 'New Store' };

      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockStore);

      const result = await createStore(unifiedApiClientMock, mockInput);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${STORES_API}/${CREATE_METHOD}`, {
        method: 'POST',
        body: JSON.stringify(mockInput),
      });
      expect(result).toEqual(mockStore);
    });
  });

  describe('updateStore', () => {
    it('should update a store', async () => {
      const mockInput: IUpdateStoreInput = { name: 'Updated Store' };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockStore);

      const result = await updateStore(unifiedApiClientMock, 'store-id', mockInput);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${STORES_API}/store-id/${UPDATE_METHOD}`, {
        method: 'PATCH',
        body: JSON.stringify(mockInput),
      });
      expect(result).toEqual(mockStore);
    });
  });

  describe('deleteStore', () => {
    it('should delete a store', async () => {
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(undefined);

      await deleteStore(unifiedApiClientMock, 'store-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${STORES_API}/store-id/${DELETE_METHOD}`, {
        method: 'DELETE',
      });
    });
  });
});
