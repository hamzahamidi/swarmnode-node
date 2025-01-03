import WebSocket from 'ws';
import { WebSocketClient } from '../../src/utils/WebSocketClient';

jest.mock('ws');

const MockWebSocket = WebSocket as jest.MockedClass<typeof WebSocket>;

describe('WebSocketClient', () => {
  const baseUrl = 'api.example.com';
  const apiKey = 'test-api-key';
  let webSocketClient: WebSocketClient;

  beforeEach(() => {
    jest.clearAllMocks();
    webSocketClient = new WebSocketClient(baseUrl, apiKey);
    MockWebSocket.mockClear();
  });

  describe('createWebSocket', () => {
    it('should create a WebSocket with the correct URL and headers', () => {
      const address = 'test-address';

      webSocketClient['createWebSocket'](address);

      expect(MockWebSocket).toHaveBeenCalledWith(
        `wss://${baseUrl}/${address}`,
        expect.objectContaining({
          headers: { Authorization: `Bearer ${apiKey}` },
        })
      );
    });

    it('should set up event listeners for WebSocket', () => {
      const address = 'test-address';
      const mockOn = jest.fn();
      MockWebSocket.mockImplementation(
        () =>
          ({
            on: mockOn,
          }) as unknown as WebSocket
      );

      webSocketClient['createWebSocket'](address);

      expect(mockOn).toHaveBeenCalledWith('open', expect.any(Function));
      expect(mockOn).toHaveBeenCalledWith('error', expect.any(Function));
      expect(mockOn).toHaveBeenCalledWith('close', expect.any(Function));
    });
  });

  describe('listen', () => {
    it('should resolve with parsed JSON data when WebSocket closes', async () => {
      const address = 'test-address';
      const mockMessage = JSON.stringify({ data: 'test' });
      const mockWs = {
        on: jest.fn((event, handler) => {
          if (event === 'message') {
            handler(mockMessage);
          }
          if (event === 'close') {
            handler();
          }
        }),
      } as unknown as WebSocket;

      MockWebSocket.mockImplementation(() => mockWs);

      const result = await webSocketClient.listen(address);

      expect(result).toEqual({ data: 'test' });
    });

    it('should reject if JSON parsing fails', async () => {
      const address = 'test-address';
      const mockMessage = 'Invalid JSON';
      const mockWs = {
        on: jest.fn((event, handler) => {
          if (event === 'message') {
            handler(mockMessage);
          }
          if (event === 'close') {
            handler();
          }
        }),
      } as unknown as WebSocket;

      MockWebSocket.mockImplementation(() => mockWs);

      await expect(webSocketClient.listen(address)).rejects.toThrow('Failed to parse WebSocket message as JSON');
    });

    it('should reject if WebSocket emits an error', async () => {
      const address = 'test-address';
      const mockError = new Error('WebSocket error');
      const mockWs = {
        on: jest.fn((event, handler) => {
          if (event === 'error') {
            handler(mockError);
          }
        }),
      } as unknown as WebSocket;

      MockWebSocket.mockImplementation(() => mockWs);

      await expect(webSocketClient.listen(address)).rejects.toThrow('WebSocket error');
    });
  });

  describe('stream', () => {
    it('should yield messages from the WebSocket', async () => {
      const address = 'test-address';
      const messages = ['message1', 'message2', 'message3'];
      const mockWs = {
        readyState: WebSocket.OPEN,
        on: jest.fn((event, handler) => {
          if (event === 'message') {
            messages.forEach((msg) => handler(msg));
          }
        }),
      } as unknown as WebSocket;

      MockWebSocket.mockImplementation(() => mockWs);

      const result: string[] = [];
      for await (const message of webSocketClient.stream(address)) {
        result.push(message);
        if (result.length === messages.length) break;
      }

      expect(result).toEqual(messages);
    });
  });
});
