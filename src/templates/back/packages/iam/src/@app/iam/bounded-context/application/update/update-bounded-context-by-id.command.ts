import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateBoundedContextByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            root?: string;
            sort?: number;
            isActive?: boolean;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}