import { Mocker, Property, SqlType } from '../../../@cliter';
import { v5 as uuidv5 } from 'uuid';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

enum MockType
{
    SEED    = 'seed',
    POSTMAN = 'postman',
    UUID    = 'uuid',
}

handlebars.registerHelper('mocker', function(
    {
        type                    = MockType.SEED,
        property                = undefined,
        uuidSeed                = 'aurora',
        hasUuidSeed             = true,             // boolean to allow for create the same uuid
        scapeQuotes             = true,
        checkFieldNameMeaning   = true,
        length                  = undefined,
        maxLength               = undefined,
        minLength               = undefined,
        totalDigits             = undefined,
        decimalDigits           = undefined,
    }: {
        type?: MockType;
        property?: Property;
        uuidSeed?: string;
        hasUuidSeed?: boolean;
        scapeQuotes?: boolean;
        checkFieldNameMeaning?: boolean;
        length?: number;
        maxLength?: number;
        minLength?: number;
        totalDigits?: number;
        decimalDigits?: number;
    } = {}
)
{
    // create mocker object
    const mocker = new Mocker();

    // namespace to generate same uuid, see https://www.npmjs.com/package/uuid
    const namespace = '01a94203-63ba-4c07-bb92-bb61cd2b8e41';

    if (type === MockType.UUID)
    {
        // take uuid seed or use aurora word to generate uuid
        return uuidv5(uuidSeed, namespace);
    }

    if (type === MockType.POSTMAN || type === MockType.SEED)
    {
        // return data defined in yaml model definition
        if (
            property?.type === SqlType.ID
            && (length || property?.length) === 36
            && property.isI18n
            && property.name === 'langId'
        )                                               return '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a';
        if (
            property?.type === SqlType.ID
            && hasUuidSeed
            && (length || property?.length) === 36
        )                                               return uuidv5(uuidSeed, namespace);
        if (property?.type === SqlType.ENUM)            return property.enumOptions ? _.shuffle(property.enumOptions)[0] : null;
        if (property?.type === SqlType.RELATIONSHIP)    return '[]';

        let propertyTotalDigits = 5;
        let propertyDecimalDigits = 3;

        if (property && Array.isArray(property.decimals))
        {
            propertyTotalDigits = property.decimals[0];
            propertyDecimalDigits = property.decimals[1];
        }

        return mocker.mock(
            property?.faker ? property.faker : property?.type as string,
            property?.name as string,
            {
                scapeQuotes,
                checkFieldNameMeaning,
                length   : length || property?.length,
                maxLength: maxLength || (property?.maxLength && property.maxLength > 1 ? property.maxLength - 1 : property && property.maxLength),
                minLength: minLength || property?.minLength,
                totalDigits: totalDigits || propertyTotalDigits,
                decimalDigits: decimalDigits || propertyDecimalDigits,
            },
        );
    }
});
