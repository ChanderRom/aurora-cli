import { Args, Command, Flags } from '@oclif/core';
import { AdditionalApis, BackHandler, ModuleDefinitionSchema, Prompter, Properties, Property, Scope, ScopeElement, PropertyType } from '../@cliter';
import { generateGraphqlTypes } from '../@cliter/functions/back';
import { getBoundedContextModuleFromFlag } from '../@cliter/functions/common';

export default class Generate extends Command
{
    static description = 'Generate aurora item';

    static flags = {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
        }),
        name: Flags.string({
            char       : 'n',
            required   : true,
            description: 'Name of element to generate.',
        }),
        noGraphQLTypes: Flags.boolean({
            char       : 'g',
            description: 'Avoid generating graphql types.',
        }),
        verbose: Flags.boolean({
            char       : 'v',
            description: 'Reports on screen all the steps followed by the command.',
        }),
    };

    static args = {
        firstArg: Args.string({
            name       : 'scope',
            required   : true,
            description: 'Scope where our command will act.',
            options    : [
                'back',
                'front',
            ],
        }),
        secondArg: Args.string({
            name       : 'element',
            required   : true,
            description: 'Type of element to generate.',
            options    : [
                'api',
                'bounded-context',
                'module',
            ],
        }),
    };

    static examples = [
        '$ aurora generate back module -n=my-bounded-context/my-module',
        '$ aurora --help',
    ];

    public async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Generate);

        if (
            args.firstArg === Scope.BACK &&
            args.secondArg === ScopeElement.MODULE
        )
        {
            const flagName: { boundedContextName?: string; moduleName?: string; } = getBoundedContextModuleFromFlag(this, flags.name);
            const { boundedContextName, moduleName, moduleNames, hasOAuth, hasTenant } = await Prompter.promptForGenerateModule(flagName.boundedContextName, flagName.moduleName);

            // define properties for generate command
            const properties: Properties = new Properties();

            // define schema for generate command
            const schema: ModuleDefinitionSchema = {
                boundedContextName,
                moduleName,
                moduleNames,
                aggregateName : boundedContextName.toPascalCase() + moduleName.toPascalCase(),
                hasOAuth,
                hasTenant,
                hasAuditing   : false,
                properties,
                additionalApis: new AdditionalApis(),
            };

            // reference schema in properties
            properties.schema = schema;

            // define state for generate command
            const generateCommandState = {
                command  : this,
                flags,
                lockFiles: [],
                schema,
            };

            // add id property for model
            properties.add(
                new Property({
                    name      : 'id',
                    type      : PropertyType.ID,
                    primaryKey: true,
                    length    : 36,
                    nullable  : false,
                    schema,
                }),
            );

            // add properties defined by user
            // eslint-disable-next-line no-await-in-loop
            while ((await Prompter.promptForGenerateAggregate()).hasValueObject)
            {
                // eslint-disable-next-line no-await-in-loop
                properties.add(await Prompter.promptDefineAggregateProperty(generateCommandState));
                Prompter.printValueObjectsTable(this, properties);
            }

            // add time stamp properties for model
            properties.add(new Property({ name: 'createdAt', type: PropertyType.TIMESTAMP, nullable: true, schema }));
            properties.add(new Property({ name: 'updatedAt', type: PropertyType.TIMESTAMP, nullable: true, schema }));
            properties.add(new Property({ name: 'deletedAt', type: PropertyType.TIMESTAMP, nullable: true, schema }));

            // generate module files
            BackHandler.generateModule(
                generateCommandState,
                { hasGenerateTestingFiles: true },
            );

            if (args.firstArg === Scope.BACK && !flags.noGraphQLTypes)
            {
                await generateGraphqlTypes(generateCommandState);
            }
        }
    }
}
