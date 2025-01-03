import { IAgentExecutorCronJob, IExecution } from '../types';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export class AgentExecutorCronJob {
  constructor(
    private unifiedApiClient: UnifiedApiClient,
    private data: IAgentExecutorCronJob
  ) {}

  public getData(): IAgentExecutorCronJob {
    return this.data;
  }

  /**
   * Streams the executions of a cron job in real-time.
   *
   * This method allows you to continuously receive and process execution updates for a specific cron job.
   * The execution stream is received over a WebSocket connection and each message is parsed into an `IExecution` object.
   *
   * Example usage:
   *
   * ```typescript
   * import { SwarmNodeClient } from 'swarmnode';
   *
   * const client = new SwarmNodeClient('YOUR_API_KEY');
   * const cronJob = await SwarmNodeClient.AgentExecutorCronJob.getById('YOUR_CRON_JOB_ID');
   *
   * for await (const execution of cronJob.stream()) {
   *   console.log(execution); // Process each execution as it arrives
   * }
   * ```
   *
   * @returns An `AsyncGenerator` that yields `IExecution` objects as they are received from the stream.
   *
   * @throws If the WebSocket connection fails or encounters an error during streaming, the promise will reject.
   */
  public async *stream(): AsyncGenerator<IExecution> {
    for await (const message of this.unifiedApiClient.websocket.stream(this.data.execution_stream_address)) {
      yield JSON.parse(message) as IExecution;
    }
  }
}
