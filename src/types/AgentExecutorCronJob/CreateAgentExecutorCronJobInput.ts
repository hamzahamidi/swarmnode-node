import { IAgentExecutorCronJob } from './AgentExecutorCronJob';

export interface ICreateAgentExecutorCronJobInput
  extends Pick<IAgentExecutorCronJob, 'name' | 'expression' | 'agent_id'> {}
