import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RoleDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'RoleDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}