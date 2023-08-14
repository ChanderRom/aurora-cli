import { CQMetadata } from '@aurorajs.dev/core';

export class QueueManagerCreateJobRegistryCommand
{
    constructor(
        public readonly payload: {
            id: string;
            queueName: string;
            state: string;
            jobId: string;
            jobName?: string;
            tags?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
