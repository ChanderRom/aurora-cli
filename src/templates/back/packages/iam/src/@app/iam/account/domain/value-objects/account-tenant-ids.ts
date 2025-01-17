import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountTenantIds extends UuidArrayValueObject
{
    public readonly type: string = 'AccountTenantIds';

    constructor(value: string | string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountTenantIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}