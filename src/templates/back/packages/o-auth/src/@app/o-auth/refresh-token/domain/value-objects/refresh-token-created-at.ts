import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RefreshTokenCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'RefreshTokenCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}