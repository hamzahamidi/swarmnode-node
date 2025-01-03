import { IAgentExecutorCronJob } from './AgentExecutorCronJob';

export interface IUpdateAgentExecutorCronJobInput extends Partial<Pick<IAgentExecutorCronJob, 'name' | 'status'>> {}
