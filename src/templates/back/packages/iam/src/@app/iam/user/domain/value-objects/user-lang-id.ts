import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserLangId extends UuidValueObject
{
    public readonly type: string = 'UserLangId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserLangId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}