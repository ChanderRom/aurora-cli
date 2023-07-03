import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Latitude extends DecimalValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel1Latitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Latitude',
            nullable   : true,
            undefinable: true,
            decimals   : [16, 14],
            unsigned   : false,
        }, validationRules));
    }
}