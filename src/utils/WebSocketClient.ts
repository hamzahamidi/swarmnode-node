import WebSocket from 'ws';

export class WebSocketClient {
  constructor(
    private baseUrl: string,
    private apiKey: string
  ) {}

  private createWebSocket(address: string): WebSocket {
    const url = `wss://${this.baseUrl}/${address}`;
    const headers = { Authorization: `Bearer ${this.apiKey}` };

    const ws = new WebSocket(url, { headers });

    ws.on('open', () => console.log(`WebSocket connected to ${url}`));
    ws.on('error', (error) => console.error(`WebSocket error on ${url}:`, error));
    ws.on('close', () => console.log(`WebSocket disconnected from ${url}`));

    return ws;
  }

  public async listen<T>(address: string, processMessage?: (data: string) => void): Promise<T> {
    return new Promise((resolve, reject) => {
      const ws = this.createWebSocket(address);
      let message = '';

      ws.on('message', (data: WebSocket.RawData) => {
        message += data.toString();
        if (processMessage) {
          processMessage(data.toString());
        }
      });

      ws.on('close', () => {
        console.log(`WebSocket connection closed for ${address}`);
        try {
          resolve(JSON.parse(message) as T);
        } catch (err) {
          reject(new Error('Failed to parse WebSocket message as JSON'));
        }
      });

      ws.on('error', (err) => {
        reject(err);
      });
    });
  }

  public async *stream(address: string): AsyncGenerator<string> {
    const ws = this.createWebSocket(address);

    const messageQueue: string[] = [];

    ws.on('message', (data: WebSocket.RawData) => {
      messageQueue.push(data.toString());
    });

    while (ws.readyState !== WebSocket.CLOSED) {
      if (messageQueue.length > 0) {
        yield messageQueue.shift()!;
      } else {
        await new Promise<void>((resolve) => ws.once('message', resolve));
      }
    }
  }
}
