export class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = `https://${baseUrl}`;
    this.apiKey = apiKey;
  }

  private createHeaders(options: RequestInit = {}): Headers {
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${this.apiKey}`);
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  private async handleResponse<T>(response: Response, uri: string): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText} for URI: ${uri}`);
    }
    return response.json();
  }

  private async makeRequest<T>(uri: string, options: RequestInit = {}): Promise<T> {
    const headers = this.createHeaders(options);
    const response = await fetch(uri, { ...options, headers });
    return this.handleResponse<T>(response, uri);
  }

  public request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.makeRequest<T>(`${this.baseUrl}${endpoint}`, options);
  }

  public requestUri<T>(uri: string, options: RequestInit = {}): Promise<T> {
    return this.makeRequest<T>(uri, options);
  }
}
