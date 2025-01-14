import { AccountResponse } from '@app/iam/account/domain/account.response';

export class TenantResponse
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly code: string,
        public readonly logo: string,
        public readonly isActive: boolean,
        public readonly meta: any,
        public readonly accountIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly accounts: AccountResponse[],
    ) {}
}