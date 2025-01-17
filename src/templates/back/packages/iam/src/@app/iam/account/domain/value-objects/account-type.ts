import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountType extends EnumValueObject
{
    public readonly type: string = 'AccountType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountType',
            nullable   : false,
            undefinable: false,
            enumOptions: ['USER','SERVICE'],
        }, validationRules));
    }
}