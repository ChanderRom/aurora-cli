import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'CountryI18nUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}