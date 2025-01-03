import { IAgentExecutorJob } from './AgentExecutorJob';

export interface ICreateAgentExecutorJobInput {
  agent_id: string;
  payload: object | null;
}
