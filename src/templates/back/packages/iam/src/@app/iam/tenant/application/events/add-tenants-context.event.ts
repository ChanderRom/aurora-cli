import { AggregateRoot } from '@nestjs/cqrs';
import { IamTenant } from '../../domain/tenant.aggregate';
import { CreatedTenantEvent } from './created-tenant.event';
import { CreatedTenantsEvent } from './created-tenants.event';
import { UpdatedTenantEvent } from './updated-tenant.event';
import { UpdatedTenantsEvent } from './updated-tenants.event';
import { DeletedTenantEvent } from './deleted-tenant.event';
import { DeletedTenantsEvent } from './deleted-tenants.event';

export class AddTenantsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamTenant[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new CreatedTenantsEvent(
                this.aggregateRoots.map(tenant =>
                    new CreatedTenantEvent(
                        tenant.id.value,
                        tenant.name.value,
                        tenant.code?.value,
                        tenant.logo?.value,
                        tenant.isActive.value,
                        tenant.meta?.value,
                        tenant.accountIds?.value,
                        tenant.createdAt?.value,
                        tenant.updatedAt?.value,
                        tenant.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new UpdatedTenantsEvent(
                this.aggregateRoots.map(tenant =>
                    new UpdatedTenantEvent(
                        tenant.id.value,
                        tenant.name.value,
                        tenant.code?.value,
                        tenant.logo?.value,
                        tenant.isActive.value,
                        tenant.meta?.value,
                        tenant.accountIds?.value,
                        tenant.createdAt?.value,
                        tenant.updatedAt?.value,
                        tenant.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new DeletedTenantsEvent(
                this.aggregateRoots.map(tenant =>
                    new DeletedTenantEvent(
                        tenant.id.value,
                        tenant.name.value,
                        tenant.code?.value,
                        tenant.logo?.value,
                        tenant.isActive.value,
                        tenant.meta?.value,
                        tenant.accountIds?.value,
                        tenant.createdAt?.value,
                        tenant.updatedAt?.value,
                        tenant.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}