import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserSurname extends StringValueObject
{
    public readonly type: string = 'UserSurname';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserSurname',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}