import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
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
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';

@Injectable()
export class UpdateBoundedContextByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    async main(
        payload: {
            id: BoundedContextId;
            name?: BoundedContextName;
            root?: BoundedContextRoot;
            sort?: BoundedContextSort;
            isActive?: BoundedContextIsActive;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const boundedContext = IamBoundedContext.register(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            null, // createdAt
            new BoundedContextUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update by id
        await this.repository.updateById(boundedContext, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(
            boundedContext,
        );

        boundedContextRegister.updated(boundedContext); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}