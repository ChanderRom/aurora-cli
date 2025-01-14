import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RefreshTokenIsRevoked extends BooleanValueObject
{
    public readonly type: string = 'RefreshTokenIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenIsRevoked',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}