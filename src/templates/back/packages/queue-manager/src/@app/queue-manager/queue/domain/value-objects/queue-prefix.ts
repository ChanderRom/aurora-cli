import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueuePrefix extends StringValueObject
{
    public readonly type: string = 'QueuePrefix';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'QueuePrefix',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}