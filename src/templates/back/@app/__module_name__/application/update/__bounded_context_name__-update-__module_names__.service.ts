import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
{{> importI18nRepository}}
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.boundedContextName }}Add{{ toPascalCase schema.moduleNames }}ContextEvent } from '../events/{{ toKebabCase schema.boundedContextName }}-add-{{ toKebabCase schema.moduleNames }}-context.event';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        payload: {
            {{#each schema.properties.updateService}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}?: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
            {{/if}}
            {{/each}}
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if schema.properties.hasI18n}}
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // override langId value object with header content-language value
        payload.langId = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18nLangId(contentLanguage.id);

        {{/if}}
        // create aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each schema.properties.aggregate}}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            null, // createdAt
{{else eq name 'updatedAt'}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq name 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.properties)}}
            null, // availableLangs
{{else}}
            payload.{{ toCamelCase name }},
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        );

        {{#if schema.properties.hasI18n}}
        // delete availableLangs property to avoid overwrite this value in database
        delete {{ toCamelCase schema.moduleName }}.availableLangs;
        {{/if}}

        // update
        await this.repository.update(
            {{ toCamelCase schema.moduleName }},
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );
        {{#if schema.properties.hasI18n}}

        await this.repositoryI18n.update(
            {{ toCamelCase schema.moduleName }},
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
                dataFactory  : (aggregate: {{ schema.aggregateName }}) => aggregate.toI18nDTO(),
            },
        );
        {{/if}}

        // get objects to delete
        const {{ toCamelCase schema.moduleNames }} = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleNames }}Register = this.publisher.mergeObjectContext(
            new {{ toPascalCase schema.boundedContextName }}Add{{ toPascalCase schema.moduleNames }}ContextEvent({{ toCamelCase schema.moduleNames }}),
        );

        {{ toCamelCase schema.moduleNames }}Register.updated(); // apply event to model events
        {{ toCamelCase schema.moduleNames }}Register.commit(); // commit all events of model
    }
}