import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'UserDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}