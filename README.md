# SwarmNode TypeScript SDK

![npm version](https://img.shields.io/npm/v/swarmnode)

The SwarmNode TypeScript SDK provides convenient access to the SwarmNode REST API from any TypeScript application. The SDK includes rich type definitions and enables developers to manage agents, execute tasks, and schedule cron jobs with ease.

## Documentation

Full documentation of the SDK is available at [https://swarmnode.ai/docs/sdk/introduction](https://swarmnode.ai/docs/sdk/introduction). You may also want to check out the [REST API Reference](https://swarmnode.ai/docs/api/introduction).

## Installation

You can install the SDK via npm:

```bash
npm install swarmnode
```

## Usage

Once installed, you can use it to make requests.

### Create an Agent

```typescript
import { SwarmNodeClient } from 'swarmnode';
import { PythonVersionEnum } from 'swarmnode/models';

// Create a new client
const client = new SwarmNodeClient('YOUR_API_KEY');

// Create a new agent
const agent = await client.Agent.create({
    name: 'My Agent',
    script: `def main(request, store):\n    return request.payload`,
    requirements: 'requests==2.31.0\npandas==2.1.4',
    env_vars: 'FOO=bar\nBAZ=qux',
    python_version: PythonVersionEnum.V_3_11,
    store_id: 'YOUR_STORE_ID',
});
```

### Execute an Agent

```typescript
import { SwarmNodeClient } from 'swarmnode';

// Create a new client
const client = new SwarmNodeClient('YOUR_API_KEY');

// Get the agent by ID
const agent = await client.Agent.getById('YOUR_AGENT_ID');

// Execute the agent with parameters
const execution = await agent.execute({ key: 'value' });
```

### Create a Cron Job

```typescript
import { SwarmNodeClient } from 'swarmnode';

// Create a new client
const client = new SwarmNodeClient('YOUR_API_KEY');

// Create a new cron job
const cronJob = await client.AgentExecutorCronJob.create({
    agentId: 'YOUR_AGENT_ID',
    name: 'My Cron Job',
    expression: '* * * * *',
});
```

### Stream Executions from a Cron Job

```typescript
import { SwarmNodeClient } from 'swarmnode';

// Create a new client
const client = new SwarmNodeClient('YOUR_API_KEY');

// Get the cron job by ID
const cronJob = await SwarmNodeClient.AgentExecutorCronJob.getById('YOUR_CRON_JOB_ID');

for await (const execution of cronJob.stream()) {
  console.log(execution); // Process each execution as it arrives
}
```

These are only a few examples of what you can do with the SDK. Refer to the full documentation to learn more about the SDK capabilities.

Contributing
Contributions are welcome! If you have any ideas or improvements, feel free to submit a pull request or open an issue.

License
This project is licensed under the MIT License. See the LICENSE file for details.
