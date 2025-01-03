import { ExecutionStatusEnum } from './ExecutionStatusEnum';

export interface IExecution {
  id: string;
  agent_id: string;
  agent_executor_job_id: string;
  agent_executor_cron_job_id: string;
  status: ExecutionStatusEnum;
  start: string;
  finish: string;
  logs: string;
  return_value: string;
}
