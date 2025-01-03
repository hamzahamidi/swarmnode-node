import { UnifiedApiClient } from '../../src/utils/UnifiedApiClient';
import { ApiClient } from '../../src/utils/ApiClient';
import { WebSocketClient } from '../../src/utils/WebSocketClient';

jest.mock('../../src/utils/ApiClient');
jest.mock('../../src/utils/WebSocketClient');

describe('UnifiedApiClient', () => {
  const baseUrl = 'api.example.com';
  const apiKey = 'test-api-key';
  let unifiedApiClient: UnifiedApiClient;

  beforeEach(() => {
    jest.clearAllMocks();
    unifiedApiClient = new UnifiedApiClient(baseUrl, apiKey);
  });

  it('should initialize ApiClient with the correct parameters', () => {
    expect(ApiClient).toHaveBeenCalledWith(baseUrl, apiKey);
  });

  it('should initialize WebSocketClient with the correct parameters', () => {
    expect(WebSocketClient).toHaveBeenCalledWith(baseUrl, apiKey);
  });

  it('should expose ApiClient and WebSocketClient instances', () => {
    expect(unifiedApiClient.api).toBeInstanceOf(ApiClient);
    expect(unifiedApiClient.websocket).toBeInstanceOf(WebSocketClient);
  });
});
