import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectIp extends StringValueObject
{
    public readonly type: string = 'SideEffectIp';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectIp',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}