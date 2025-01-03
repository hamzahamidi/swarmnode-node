import { createAgentExecutorJob } from '../api/agent-executor-jobs';
import { listenToExecution } from '../api/executions';
import { IAgent, IAgentExecutorJob, IExecution } from '../types';
import { UnifiedApiClient } from '../utils/UnifiedApiClient';

export class Agent {
  constructor(
    private unifiedApiClient: UnifiedApiClient,
    private data: IAgent
  ) {}

  public getData(): IAgent {
    return this.data;
  }

  /**
   * Executes the given payload.
   * If `isWait` is true, it waits for the execution to complete and returns the result.
   * Otherwise, it returns the execution job immediately.
   *
   * @param payload - The payload to execute as a JSON object.
   * @param isWait - Whether to wait for the execution to complete. Default is true.
   * @returns A promise that resolves to the execution result or the execution job.
   */
  public async execute(payload: Record<string, unknown>, isWait: boolean): Promise<IAgentExecutorJob | IExecution> {
    const agentExecutorJob = await createAgentExecutorJob(this.unifiedApiClient, {
      agent_id: this.data.id,
      payload,
    });

    if (!isWait) {
      return agentExecutorJob;
    }

    return listenToExecution(this.unifiedApiClient, agentExecutorJob.execution_address);
  }
}
