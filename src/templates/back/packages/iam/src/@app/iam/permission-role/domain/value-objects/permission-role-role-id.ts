import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class PermissionRoleRoleId extends UuidValueObject
{
    public readonly type: 'PermissionRoleId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionRoleId',
            nullable   : false,
            undefinable: false,
            length     : 36
        }, validationRules), data);
    }
}