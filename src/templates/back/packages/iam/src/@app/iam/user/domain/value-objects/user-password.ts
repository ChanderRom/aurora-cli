import { DataValueObject, PasswordValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserPassword extends PasswordValueObject
{
    public readonly type: string = 'UserPassword';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserPassword',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules), data);
    }
}