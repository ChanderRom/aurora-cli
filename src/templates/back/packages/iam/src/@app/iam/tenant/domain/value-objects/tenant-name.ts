import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class TenantName extends StringValueObject
{
    public readonly type: string = 'TenantName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}