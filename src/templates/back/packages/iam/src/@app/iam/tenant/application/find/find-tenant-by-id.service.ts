import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { ITenantRepository } from '../../domain/tenant.repository';
import { IamTenant } from '../../domain/tenant.aggregate';
import { TenantId } from '../../domain/value-objects';

@Injectable()
export class FindTenantByIdService
{
    constructor(
        private readonly repository: ITenantRepository,
    ) {}

    async main(
        id: TenantId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamTenant>
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