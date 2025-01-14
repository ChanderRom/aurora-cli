import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class BoundedContextRoot extends StringValueObject
{
    public readonly type: string = 'BoundedContextRoot';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextRoot',
            nullable   : false,
            undefinable: false,
            maxLength  : 30,
        }, validationRules));
    }
}