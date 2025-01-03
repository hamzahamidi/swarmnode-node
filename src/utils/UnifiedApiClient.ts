import { ApiClient } from './ApiClient';
import { WebSocketClient } from './WebSocketClient';

export class UnifiedApiClient {
  public api: ApiClient;
  public websocket: WebSocketClient;

  constructor(baseUrl: string, apiKey: string) {
    this.api = new ApiClient(baseUrl, apiKey);
    this.websocket = new WebSocketClient(baseUrl, apiKey);
  }
}
