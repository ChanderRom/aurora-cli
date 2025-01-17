import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RefreshTokenDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'RefreshTokenDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}