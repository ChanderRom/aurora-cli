import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AccountUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}