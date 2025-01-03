import { AgentExecutorCronJobStatusEnum } from './AgentExecutorCronJobStatusEnum';

export interface IAgentExecutorCronJob {
  id: string;
  agent_id: string;
  name: string;
  status: AgentExecutorCronJobStatusEnum;
  expression: string;
  execution_stream_address: string;
  created: string;
  modified: string;
}
