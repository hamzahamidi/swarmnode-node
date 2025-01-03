import * as agentsAPI from './api/agents';
import * as agentBuilderJobsAPI from './api/agent-builder-jobs';
import * as agentExecutorCronJobsAPI from './api/agent-executor-cron-jobs';
import * as agentExecutorJobsAPI from './api/agent-executor-jobs';
import * as buildsAPI from './api/builds';
import * as executionsAPI from './api/executions';
import * as storesAPI from './api/stores';
import {
  ICreateAgentExecutorCronJobInput,
  ICreateAgentExecutorJobInput,
  ICreateAgentInput,
  ICreateStoreInput,
  IUpdateAgentExecutorCronJobInput,
  IUpdateAgentInput,
  IUpdateStoreInput,
} from './types';
import { API_URL } from './utils/constants';
import { UnifiedApiClient } from './utils/UnifiedApiClient';

class SwarmNodeClient {
  private unifiedApiClient: UnifiedApiClient;

  constructor(apiKey: string, baseUrl?: string) {
    this.unifiedApiClient = new UnifiedApiClient(baseUrl ?? API_URL, apiKey);
  }

  public AgentBuilderJob = {
    listAll: () => agentBuilderJobsAPI.listAllAgentBuilderJobs(this.unifiedApiClient),
    getById: (id: string) => agentBuilderJobsAPI.getAgentBuilderJobById(this.unifiedApiClient, id),
  };

  public AgentExecutorCronJob = {
    listAll: () => agentExecutorCronJobsAPI.listAllAgentExecutorCronJobs(this.unifiedApiClient),
    getById: (id: string) => agentExecutorCronJobsAPI.getAgentExecutorCronJobById(this.unifiedApiClient, id),
    delete: (id: string) => agentExecutorCronJobsAPI.deleteAgentExecutorCronJob(this.unifiedApiClient, id),
    update: (id: string, updateAgentExecutorCronJob: IUpdateAgentExecutorCronJobInput) =>
      agentExecutorCronJobsAPI.updateAgentExecutorCronJob(this.unifiedApiClient, id, updateAgentExecutorCronJob),
    create: (createAgentExecutorCronJob: ICreateAgentExecutorCronJobInput) =>
      agentExecutorCronJobsAPI.createAgentExecutorCronJob(this.unifiedApiClient, createAgentExecutorCronJob),
  };

  public AgentExecutorJob = {
    listAll: () => agentExecutorJobsAPI.listAllAgentExecutorJobs(this.unifiedApiClient),
    getById: (id: string) => agentExecutorJobsAPI.getAgentExecutorJobById(this.unifiedApiClient, id),
    create: (createAgentExecutorJob: ICreateAgentExecutorJobInput) =>
      agentExecutorJobsAPI.createAgentExecutorJob(this.unifiedApiClient, createAgentExecutorJob),
  };

  public Agent = {
    listAll: () => agentsAPI.listAllAgents(this.unifiedApiClient),
    getById: (id: string) => agentsAPI.getAgentById(this.unifiedApiClient, id),
    delete: (id: string) => agentsAPI.deleteAgent(this.unifiedApiClient, id),
    update: (id: string, agent: IUpdateAgentInput) => agentsAPI.updateAgent(this.unifiedApiClient, id, agent),
    create: (agent: ICreateAgentInput) => agentsAPI.createAgent(this.unifiedApiClient, agent),
  };

  public Build = {
    listAll: () => buildsAPI.listAllBuilds(this.unifiedApiClient),
    getById: (id: string) => buildsAPI.getBuildById(this.unifiedApiClient, id),
  };

  public Execution = {
    listAll: () => executionsAPI.listAllExecutions(this.unifiedApiClient),
    getById: (id: string) => executionsAPI.getExecutionById(this.unifiedApiClient, id),
  };

  public Store = {
    listAll: () => storesAPI.listAllStores(this.unifiedApiClient),
    getById: (id: string) => storesAPI.getStoreById(this.unifiedApiClient, id),
    delete: (id: string) => storesAPI.deleteStore(this.unifiedApiClient, id),
    update: (id: string, store: IUpdateStoreInput) => storesAPI.updateStore(this.unifiedApiClient, id, store),
    create: (store: ICreateStoreInput) => storesAPI.createStore(this.unifiedApiClient, store),
  };
}

export { SwarmNodeClient };
