import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantMeta,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';
import { ITenantRepository } from '../../domain/tenant.repository';
import { IamTenant } from '../../domain/tenant.aggregate';
import { AddTenantsContextEvent } from '../events/add-tenants-context.event';

@Injectable()
export class CreateTenantsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository,
    ) {}

    async main(
        tenants: {
            id: TenantId;
            name: TenantName;
            code: TenantCode;
            logo: TenantLogo;
            isActive: TenantIsActive;
            meta: TenantMeta;
            accountIds: TenantAccountIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateTenants = tenants.map(tenant => IamTenant.register(
            tenant.id,
            tenant.name,
            tenant.code,
            tenant.logo,
            tenant.isActive,
            tenant.meta,
            tenant.accountIds,
            new TenantCreatedAt({ currentTimestamp: true }),
            new TenantUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateTenants, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddTenantsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tenantsRegistered = this.publisher.mergeObjectContext(new AddTenantsContextEvent(aggregateTenants));

        tenantsRegistered.created(); // apply event to model events
        tenantsRegistered.commit(); // commit all events of model
    }
}