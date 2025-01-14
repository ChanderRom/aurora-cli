import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccessTokenExpiresAt extends TimestampValueObject
{
    public readonly type: string = 'AccessTokenExpiresAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenExpiresAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}