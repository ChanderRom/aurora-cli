import { BlobValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class TenantLogo extends BlobValueObject
{
    public readonly type: string = 'TenantLogo';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantLogo',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}