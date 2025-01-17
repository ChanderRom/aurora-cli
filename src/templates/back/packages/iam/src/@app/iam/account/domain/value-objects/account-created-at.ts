import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AccountCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}