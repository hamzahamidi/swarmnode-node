import { listAllAgents, getAgentById, createAgent, updateAgent, deleteAgent } from '../../src/api/agents';
import { Agent } from '../../src/models/Agent';
import { IAgent, ICreateAgentInput, IUpdateAgentInput, IRawPaginatedResponse } from '../../src/types';
import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { AGENTS_API, CREATE_METHOD, DELETE_METHOD, UPDATE_METHOD } from '../../src/utils/constants';
import { PaginatedResponseHandler } from '../../src/utils/PaginatedResponseHandler';
import { PythonVersionEnum } from '../../src/types/PythonVersionEnum';

jest.mock('../../src/utils/UnifiedApiClient');

describe('agents API', () => {
  let unifiedApiClientMock: jest.Mocked<UnifiedApiClient>;
  const mockAgent: IAgent = {
    id: 'agent-id',
    name: 'Test Agent',
    created: '2024-01-01T00:00:00Z',
    modified: '2024-01-01T00:00:00Z',
    env_vars: '',
    python_version: PythonVersionEnum.V_3_10,
    requirements: '',
    script: '',
    store_id: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClientMock = {
      api: {
        request: jest.fn(),
      },
    } as unknown as jest.Mocked<UnifiedApiClient>;
  });

  describe('listAllAgents', () => {
    it('should list all agents', async () => {
      const mockResponse: IRawPaginatedResponse<IAgent> = {
        results: [],
        total_count: 0,
        current_page: 1,
        next: null,
        previous: null,
      };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockResponse);

      const result = await listAllAgents(unifiedApiClientMock);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENTS_API}/`);
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

  describe('getAgentById', () => {
    it('should get an agent by ID', async () => {
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockAgent);

      const result = await getAgentById(unifiedApiClientMock, 'agent-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENTS_API}/agent-id/`);
      expect(result).toBeInstanceOf(Agent);
      expect(result.getData()).toEqual(mockAgent);
    });
  });

  describe('createAgent', () => {
    it('should create an agent', async () => {
      const mockInput: ICreateAgentInput = mockAgent;
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockAgent);

      const result = await createAgent(unifiedApiClientMock, mockInput);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENTS_API}/${CREATE_METHOD}`, {
        method: 'POST',
        body: JSON.stringify(mockInput),
      });
      expect(result).toBeInstanceOf(Agent);
      expect(result.getData()).toEqual(mockAgent);
    });
  });

  describe('updateAgent', () => {
    it('should update an agent', async () => {
      const mockInput: IUpdateAgentInput = { id: 'agent-id', name: 'Updated Agent' };
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(mockAgent);

      const result = await updateAgent(unifiedApiClientMock, 'agent-id', mockInput);

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENTS_API}/agent-id/${UPDATE_METHOD}`, {
        method: 'PATCH',
        body: JSON.stringify(mockInput),
      });
      expect(result).toBeInstanceOf(Agent);
      expect(result.getData()).toEqual(mockAgent);
    });
  });

  describe('deleteAgent', () => {
    it('should delete an agent', async () => {
      (unifiedApiClientMock.api.request as jest.Mock).mockResolvedValue(undefined);

      await deleteAgent(unifiedApiClientMock, 'agent-id');

      expect(unifiedApiClientMock.api.request).toHaveBeenCalledWith(`${AGENTS_API}/agent-id/${DELETE_METHOD}`, {
        method: 'DELETE',
      });
    });
  });
});
