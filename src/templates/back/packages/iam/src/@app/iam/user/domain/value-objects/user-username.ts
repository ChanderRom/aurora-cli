import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserUsername extends StringValueObject
{
    public readonly type: string = 'UserUsername';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserUsername',
            nullable   : false,
            undefinable: false,
            maxLength  : 120,
        }, validationRules));
    }
}