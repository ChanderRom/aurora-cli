import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from '../../domain/value-objects';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';
import { boundedContexts } from './mock-bounded-context.data';
import * as _ from 'lodash';

@Injectable()
export class MockBoundedContextSeeder extends MockSeeder<IamBoundedContext>
{
    public collectionSource: IamBoundedContext[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const boundedContext of _.orderBy(boundedContexts, ['id']))
        {
            this.collectionSource.push(
                IamBoundedContext.register(
                    new BoundedContextId(boundedContext.id),
                    new BoundedContextName(boundedContext.name),
                    new BoundedContextRoot(boundedContext.root),
                    new BoundedContextSort(boundedContext.sort),
                    new BoundedContextIsActive(boundedContext.isActive),
                    new BoundedContextCreatedAt({ currentTimestamp: true }),
                    new BoundedContextUpdatedAt({ currentTimestamp: true }),
                    new BoundedContextDeletedAt(null),
                ),
            );
        }
    }
}