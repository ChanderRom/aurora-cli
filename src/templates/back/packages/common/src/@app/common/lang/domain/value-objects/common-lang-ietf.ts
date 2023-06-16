import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangIetf extends StringValueObject
{
    public readonly type: string = 'LangIetf';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangIetf',
            nullable   : false,
            undefinable: false,
            length     : 5,
        }, validationRules));
    }
}