import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryState,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from '../../domain/value-objects';
import { QueueManagerJobRegistry } from '../../domain/job-registry.aggregate';
import { jobsRegistry } from './mock-job-registry.data';
import * as _ from 'lodash';

@Injectable()
export class MockJobRegistrySeeder extends MockSeeder<QueueManagerJobRegistry>
{
    public collectionSource: QueueManagerJobRegistry[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const jobRegistry of _.orderBy(jobsRegistry, ['id']))
        {
            this.collectionSource.push(
                QueueManagerJobRegistry.register(
                    new JobRegistryId(jobRegistry.id),
                    new JobRegistryQueueName(jobRegistry.queueName),
                    new JobRegistryState(jobRegistry.state),
                    new JobRegistryJobId(jobRegistry.jobId),
                    new JobRegistryJobName(jobRegistry.jobName),
                    new JobRegistryTags(jobRegistry.tags),
                    new JobRegistryCreatedAt({ currentTimestamp: true }),
                    new JobRegistryUpdatedAt({ currentTimestamp: true }),
                    new JobRegistryDeletedAt(null),
                ),
            );
        }
    }
}