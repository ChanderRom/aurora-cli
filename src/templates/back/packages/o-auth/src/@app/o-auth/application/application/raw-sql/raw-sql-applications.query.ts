import { CQMetadata } from '@aurorajs.dev/core';

export class RawSQLApplicationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}