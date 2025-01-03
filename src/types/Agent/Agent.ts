import { PythonVersionEnum } from '../PythonVersionEnum';

export interface IAgent {
  id: string;
  name: string;
  script: string;
  requirements: string;
  env_vars: string;
  python_version: PythonVersionEnum;
  store_id: string;
  created: string;
  modified: string;
}
