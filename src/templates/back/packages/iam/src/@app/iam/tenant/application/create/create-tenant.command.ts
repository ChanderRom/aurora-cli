import { CQMetadata } from '@aurorajs.dev/core';

export class CreateTenantCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            code?: string;
            logo?: string;
            isActive: boolean;
            meta?: any;
            accountIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}