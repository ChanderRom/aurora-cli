import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonUpdateAttachmentFamilyByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            resourceId?: string;
            name?: string;
            width?: number;
            height?: number;
            fitType?: string;
            quality?: number;
            sizes?: any;
            format?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
