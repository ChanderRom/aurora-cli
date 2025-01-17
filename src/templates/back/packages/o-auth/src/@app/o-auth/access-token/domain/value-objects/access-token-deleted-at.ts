import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccessTokenDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AccessTokenDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}