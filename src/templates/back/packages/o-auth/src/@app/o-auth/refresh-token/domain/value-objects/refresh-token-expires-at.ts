import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RefreshTokenExpiresAt extends TimestampValueObject
{
    public readonly type: string = 'RefreshTokenExpiresAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenExpiresAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}