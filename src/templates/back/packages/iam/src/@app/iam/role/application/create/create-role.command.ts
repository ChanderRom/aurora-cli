import { CQMetadata } from '@aurorajs.dev/core';

export class CreateRoleCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            isMaster: boolean;
            permissionIds?: string[];
            accountIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}