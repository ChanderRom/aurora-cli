import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountClientId extends UuidValueObject
{
    public readonly type: string = 'AccountClientId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountClientId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}