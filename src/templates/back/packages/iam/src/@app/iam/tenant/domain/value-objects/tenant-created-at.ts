import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class TenantCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'TenantCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}