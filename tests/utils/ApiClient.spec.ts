import { ApiClient } from '../../src/utils/ApiClient';

const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

describe('ApiClient', () => {
  const baseUrl = 'api.example.com';
  const apiKey = 'test-api-key';
  let apiClient: ApiClient;

  beforeEach(() => {
    jest.clearAllMocks();
    apiClient = new ApiClient(baseUrl, apiKey);
    mockFetch.mockReset();
  });

  describe('constructor', () => {
    it('should initialize the base URL with https and store the API key', () => {
      expect(apiClient['baseUrl']).toBe(`https://${baseUrl}`);
      expect(apiClient['apiKey']).toBe(apiKey);
    });
  });

  describe('createHeaders', () => {
    it('should create headers with Authorization and Content-Type', () => {
      const options = { headers: { 'Custom-Header': 'value' } };
      const headers = apiClient['createHeaders'](options as RequestInit);

      expect(headers.get('Authorization')).toBe(`Bearer ${apiKey}`);
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('Custom-Header')).toBe('value');
    });
  });

  describe('handleResponse', () => {
    it('should parse JSON when response is OK', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      } as unknown as Response;

      const result = await apiClient['handleResponse'](mockResponse, 'test-uri');
      expect(result).toEqual({ data: 'test' });
    });

    it('should throw an error when response is not OK', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        text: jest.fn().mockResolvedValue('Not Found'),
      } as unknown as Response;

      await expect(apiClient['handleResponse'](mockResponse, 'test-uri')).rejects.toThrow(
        'HTTP error! Status: 404, Response: Not Found for URI: test-uri'
      );
    });
  });

  describe('makeRequest', () => {
    it('should make a fetch call with the correct URL and headers', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      const result = await apiClient['makeRequest']('https://test.com', {
        method: 'GET',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://test.com',
        expect.objectContaining({
          headers: expect.any(Headers),
          method: 'GET',
        })
      );
      expect(result).toEqual({ data: 'test' });
    });
  });

  describe('request', () => {
    it('should call makeRequest with the base URL and endpoint', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      const result = await apiClient.request('/test', { method: 'GET' });

      expect(mockFetch).toHaveBeenCalledWith(
        `https://${baseUrl}/test`,
        expect.objectContaining({
          headers: expect.any(Headers),
          method: 'GET',
        })
      );
      expect(result).toEqual({ data: 'test' });
    });
  });

  describe('requestUri', () => {
    it('should call makeRequest with the full URI', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      } as unknown as Response;

      mockFetch.mockResolvedValue(mockResponse);

      const result = await apiClient.requestUri('https://test.com', { method: 'GET' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://test.com',
        expect.objectContaining({
          headers: expect.any(Headers),
          method: 'GET',
        })
      );
      expect(result).toEqual({ data: 'test' });
    });
  });
});
