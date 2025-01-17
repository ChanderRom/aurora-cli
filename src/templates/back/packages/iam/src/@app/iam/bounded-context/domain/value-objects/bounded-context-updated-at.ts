import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class BoundedContextUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'BoundedContextUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}