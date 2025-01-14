import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class TenantId extends UuidValueObject
{
    public readonly type: string = 'TenantId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}