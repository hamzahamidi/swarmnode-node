import { IAgent } from './Agent';

export interface ICreateAgentInput extends Omit<IAgent, 'id' | 'created' | 'modified'> {}
