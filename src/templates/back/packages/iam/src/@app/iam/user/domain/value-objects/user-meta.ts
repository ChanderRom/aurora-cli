import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserMeta extends JsonValueObject
{
    public readonly type: string = 'UserMeta';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserMeta',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}