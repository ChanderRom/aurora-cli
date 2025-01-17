import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserAccountId extends UuidValueObject
{
    public readonly type: string = 'UserAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserAccountId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}