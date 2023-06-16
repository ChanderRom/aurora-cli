import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangDir extends EnumValueObject
{
    public readonly type: string = 'LangDir';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangDir',
            nullable   : false,
            undefinable: false,
            enumOptions: ['LTR','RTL'],
        }, validationRules));
    }
}