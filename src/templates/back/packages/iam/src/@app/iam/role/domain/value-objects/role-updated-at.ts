import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RoleUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'RoleUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}