import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { Property } from '../../utils';

handlebars.registerHelper('indexesManager', function(
    {
        indexes = [],
    }: {
        indexes: Property[];
    },
    context,
)
{
    const indexedGrouped = _.groupBy(indexes, 'indexName');
    let response = '';

    for (const [indexName, indexes] of Object.entries(indexedGrouped))
    {
        if (indexName === 'undefined') continue;

        response += '\t\t{\n';
        response += '\t\t\tfields: [';

        for (const [i, index] of indexes.entries())
        {
            if (i === indexes.length - 1)
            {
                response += `'${index.name}'`;
                continue;
            }

            response += `'${index.name}', `;
        }

        response += '],\n';
        response += `\t\t\tunique: ${indexes[0].index === 'unique' ? 'true' : 'false'},\n`;
        response += `\t\t\tname: '${indexName}',\n`;
        response += '\t\t},\n';
    }

    if (Array.isArray(indexedGrouped.undefined))
    {
        for (const index of indexedGrouped.undefined)
        {
            response += '\t\t{\n';
            response += `\t\t\tfields: ['${index.name}'],\n`;
            response += `\t\t\tunique: ${indexedGrouped.undefined[0].index === 'unique' ? 'true' : 'false'},\n`;
            response += '\t\t},\n';
        }
    }

    return response;
});
