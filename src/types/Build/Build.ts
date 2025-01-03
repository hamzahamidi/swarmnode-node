import { BuildStatusEnum } from './BuildStatusEnum';

export interface IBuild {
  id: string;
  agent_builder_job_id: string;
  status: BuildStatusEnum;
  logs: object;
  created: string;
}
