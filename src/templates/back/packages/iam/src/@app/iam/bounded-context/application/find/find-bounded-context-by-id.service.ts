import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';
import { BoundedContextId } from '../../domain/value-objects';

@Injectable()
export class FindBoundedContextByIdService
{
    constructor(
        private readonly repository: IBoundedContextRepository,
    ) {}

    async main(
        id: BoundedContextId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamBoundedContext>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}