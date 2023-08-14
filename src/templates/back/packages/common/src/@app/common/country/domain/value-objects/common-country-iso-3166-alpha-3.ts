import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryIso3166Alpha3 extends StringValueObject
{
    public readonly type: string = 'CommonCountryIso3166Alpha3';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountryIso3166Alpha3',
            nullable   : false,
            undefinable: false,
            length     : 3,
        }, validationRules));
    }
}