import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RoleId extends UuidValueObject
{
    public readonly type: string = 'RoleId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}