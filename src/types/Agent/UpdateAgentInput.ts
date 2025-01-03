import { IAgent } from './Agent';

export interface IUpdateAgentInput extends Partial<Omit<IAgent, 'id'>> {
  id: string;
}
