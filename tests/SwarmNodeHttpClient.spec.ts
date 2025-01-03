import { SwarmNodeClient } from '../src/SwarmNodeClient';
import * as agentsAPI from '../src/api/agents';
import * as agentBuilderJobsAPI from '../src/api/agent-builder-jobs';
import * as agentExecutorCronJobsAPI from '../src/api/agent-executor-cron-jobs';
import * as agentExecutorJobsAPI from '../src/api/agent-executor-jobs';
import * as buildsAPI from '../src/api/builds';
import * as executionsAPI from '../src/api/executions';
import * as storesAPI from '../src/api/stores';
import { UnifiedApiClient } from '../src/utils/UnifiedApiClient';
import {
  IAgent,
  IAgentExecutorCronJob,
  ICreateAgentExecutorCronJobInput,
  IAgentBuilderJob,
  ICreateAgentInput,
  IUpdateAgentInput,
  IBuild,
  IExecution,
  IStore,
  IAgentExecutorJob,
  ICreateAgentExecutorJobInput,
} from '../src/types';
import { Agent, AgentExecutorCronJob } from '../src/models';
import { PaginatedResponseHandler } from '../src/utils/PaginatedResponseHandler';

jest.mock('../src/api/agents');
jest.mock('../src/api/agent-builder-jobs');
jest.mock('../src/api/agent-executor-cron-jobs');
jest.mock('../src/api/agent-executor-jobs');
jest.mock('../src/api/builds');
jest.mock('../src/api/executions');
jest.mock('../src/api/stores');
jest.mock('../src/utils/UnifiedApiClient');

describe('SwarmNodeClient', () => {
  let client: SwarmNodeClient;
  let mockApiClient: UnifiedApiClient;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApiClient = new UnifiedApiClient('mock-api-url', 'mock-api-key');
    client = new SwarmNodeClient('mock-api-key', 'mock-api-url');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AgentBuilderJob', () => {
    it('should call listAllAgentBuilderJobs', async () => {
      const listAllMock = jest
        .spyOn(agentBuilderJobsAPI, 'listAllAgentBuilderJobs')
        .mockResolvedValue({} as unknown as PaginatedResponseHandler<IAgentBuilderJob>);
      await client.AgentBuilderJob.listAll();
      expect(listAllMock).toHaveBeenCalledWith(mockApiClient);
    });

    it('should call getAgentBuilderJobById', async () => {
      const getByIdMock = jest
        .spyOn(agentBuilderJobsAPI, 'getAgentBuilderJobById')
        .mockResolvedValue({} as unknown as IAgentBuilderJob);
      const jobId = '123';
      await client.AgentBuilderJob.getById(jobId);
      expect(getByIdMock).toHaveBeenCalledWith(mockApiClient, jobId);
    });
  });

  describe('AgentExecutorCronJob', () => {
    it('should call listAllAgentExecutorCronJobs', async () => {
      const listAllMock = jest
        .spyOn(agentExecutorCronJobsAPI, 'listAllAgentExecutorCronJobs')
        .mockResolvedValue({} as unknown as PaginatedResponseHandler<IAgentExecutorCronJob>);
      await client.AgentExecutorCronJob.listAll();
      expect(listAllMock).toHaveBeenCalledWith(mockApiClient);
    });

    it('should call getAgentExecutorCronJobById', async () => {
      const getByIdMock = jest
        .spyOn(agentExecutorCronJobsAPI, 'getAgentExecutorCronJobById')
        .mockResolvedValue({} as unknown as AgentExecutorCronJob);
      const cronJobId = '456';
      await client.AgentExecutorCronJob.getById(cronJobId);
      expect(getByIdMock).toHaveBeenCalledWith(mockApiClient, cronJobId);
    });

    it('should call deleteAgentExecutorCronJob', async () => {
      const deleteMock = jest.spyOn(agentExecutorCronJobsAPI, 'deleteAgentExecutorCronJob').mockResolvedValue();
      const cronJobId = '456';
      await client.AgentExecutorCronJob.delete(cronJobId);
      expect(deleteMock).toHaveBeenCalledWith(mockApiClient, cronJobId);
    });

    it('should call updateAgentExecutorCronJob', async () => {
      const updateMock = jest
        .spyOn(agentExecutorCronJobsAPI, 'updateAgentExecutorCronJob')
        .mockResolvedValue({} as unknown as AgentExecutorCronJob);
      const cronJobId = '456';
      const updateData = { name: 'New Cron Job' };
      await client.AgentExecutorCronJob.update(cronJobId, updateData);
      expect(updateMock).toHaveBeenCalledWith(mockApiClient, cronJobId, updateData);
    });

    it('should call createAgentExecutorCronJob', async () => {
      const createMock = jest
        .spyOn(agentExecutorCronJobsAPI, 'createAgentExecutorCronJob')
        .mockResolvedValue({} as unknown as AgentExecutorCronJob);
      const createData = { name: 'New Cron Job' } as unknown as ICreateAgentExecutorCronJobInput;
      await client.AgentExecutorCronJob.create(createData);
      expect(createMock).toHaveBeenCalledWith(mockApiClient, createData);
    });
  });

  describe('AgentExecutorJob', () => {
    it('should call listAllAgentExecutorJobs', async () => {
      const listAllMock = jest
        .spyOn(agentExecutorJobsAPI, 'listAllAgentExecutorJobs')
        .mockResolvedValue({} as unknown as PaginatedResponseHandler<IAgentExecutorJob>);
      await client.AgentExecutorJob.listAll();
      expect(listAllMock).toHaveBeenCalledWith(mockApiClient);
    });

    it('should call getAgentExecutorJobById', async () => {
      const getByIdMock = jest
        .spyOn(agentExecutorJobsAPI, 'getAgentExecutorJobById')
        .mockResolvedValue({} as unknown as IAgentExecutorJob);
      const jobId = '123';
      await client.AgentExecutorJob.getById(jobId);
      expect(getByIdMock).toHaveBeenCalledWith(mockApiClient, jobId);
    });

    it('should call createAgentExecutorJob', async () => {
      const createMock = jest
        .spyOn(agentExecutorJobsAPI, 'createAgentExecutorJob')
        .mockResolvedValue({} as unknown as IAgentExecutorJob);
      const createData = { name: 'New Job' };
      await client.AgentExecutorJob.create(createData as unknown as ICreateAgentExecutorJobInput);
      expect(createMock).toHaveBeenCalledWith(mockApiClient, createData);
    });
  });

  describe('Agent', () => {
    it('should call listAllAgents', async () => {
      const listAllMock = jest
        .spyOn(agentsAPI, 'listAllAgents')
        .mockResolvedValue({} as unknown as PaginatedResponseHandler<IAgent>);

      await client.Agent.listAll();
      expect(listAllMock).toHaveBeenCalledWith(mockApiClient);
    });

    it('should call getAgentById', async () => {
      const getByIdMock = jest.spyOn(agentsAPI, 'getAgentById').mockResolvedValue({} as unknown as Agent);
      const agentId = '789';
      await client.Agent.getById(agentId);
      expect(getByIdMock).toHaveBeenCalledWith(mockApiClient, agentId);
    });

    it('should call deleteAgent', async () => {
      const deleteMock = jest.spyOn(agentsAPI, 'deleteAgent').mockResolvedValue();
      const agentId = '789';
      await client.Agent.delete(agentId);
      expect(deleteMock).toHaveBeenCalledWith(mockApiClient, agentId);
    });

    it('should call updateAgent', async () => {
      const updateMock = jest.spyOn(agentsAPI, 'updateAgent').mockResolvedValue({} as unknown as Agent);
      const agentId = '789';
      const updateData = { name: 'New Agent' };
      await client.Agent.update(agentId, updateData as unknown as IUpdateAgentInput);
      expect(updateMock).toHaveBeenCalledWith(mockApiClient, agentId, updateData);
    });

    it('should call createAgent', async () => {
      const createMock = jest.spyOn(agentsAPI, 'createAgent').mockResolvedValue({} as unknown as Agent);
      const createData = { name: 'New Agent' };
      await client.Agent.create(createData as unknown as ICreateAgentInput);
      expect(createMock).toHaveBeenCalledWith(mockApiClient, createData);
    });
  });

  describe('Build', () => {
    it('should call listAllBuilds', async () => {
      const listAllMock = jest
        .spyOn(buildsAPI, 'listAllBuilds')
        .mockResolvedValue({} as unknown as PaginatedResponseHandler<IBuild>);
      await client.Build.listAll();
      expect(listAllMock).toHaveBeenCalledWith(mockApiClient);
    });

    it('should call getBuildById', async () => {
      const getByIdMock = jest.spyOn(buildsAPI, 'getBuildById').mockResolvedValue({} as unknown as IBuild);
      const buildId = '001';
      await client.Build.getById(buildId);
      expect(getByIdMock).toHaveBeenCalledWith(mockApiClient, buildId);
    });
  });

  describe('Execution', () => {
    it('should call listAllExecutions', async () => {
      const listAllMock = jest
        .spyOn(executionsAPI, 'listAllExecutions')
        .mockResolvedValue({} as unknown as PaginatedResponseHandler<IExecution>);
      await client.Execution.listAll();
      expect(listAllMock).toHaveBeenCalledWith(mockApiClient);
    });

    it('should call getExecutionById', async () => {
      const getByIdMock = jest.spyOn(executionsAPI, 'getExecutionById').mockResolvedValue({} as unknown as IExecution);
      const executionId = '999';
      await client.Execution.getById(executionId);
      expect(getByIdMock).toHaveBeenCalledWith(mockApiClient, executionId);
    });
  });

  describe('Store', () => {
    it('should call listAllStores', async () => {
      const listAllMock = jest
        .spyOn(storesAPI, 'listAllStores')
        .mockResolvedValue({} as unknown as PaginatedResponseHandler<IStore>);
      await client.Store.listAll();
      expect(listAllMock).toHaveBeenCalledWith(mockApiClient);
    });

    it('should call getStoreById', async () => {
      const getByIdMock = jest.spyOn(storesAPI, 'getStoreById').mockResolvedValue({} as unknown as IStore);
      const storeId = '1024';
      await client.Store.getById(storeId);
      expect(getByIdMock).toHaveBeenCalledWith(mockApiClient, storeId);
    });

    it('should call deleteStore', async () => {
      const deleteMock = jest.spyOn(storesAPI, 'deleteStore').mockResolvedValue();
      const storeId = '1024';
      await client.Store.delete(storeId);
      expect(deleteMock).toHaveBeenCalledWith(mockApiClient, storeId);
    });

    it('should call updateStore', async () => {
      const updateMock = jest.spyOn(storesAPI, 'updateStore').mockResolvedValue({} as unknown as IStore);
      const storeId = '1024';
      const updateData = { name: 'New Store' };
      await client.Store.update(storeId, updateData);
      expect(updateMock).toHaveBeenCalledWith(mockApiClient, storeId, updateData);
    });

    it('should call createStore', async () => {
      const createMock = jest.spyOn(storesAPI, 'createStore').mockResolvedValue({} as unknown as IStore);
      const createData = { name: 'New Store' };
      await client.Store.create(createData);
      expect(createMock).toHaveBeenCalledWith(mockApiClient, createData);
    });
  });
});
