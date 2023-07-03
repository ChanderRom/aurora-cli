import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3CreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel3CreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3CreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}