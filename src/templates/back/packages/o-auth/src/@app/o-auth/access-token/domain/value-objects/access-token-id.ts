import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccessTokenId extends UuidValueObject
{
    public readonly type: string = 'AccessTokenId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}