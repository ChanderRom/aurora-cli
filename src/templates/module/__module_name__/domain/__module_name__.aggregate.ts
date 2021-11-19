/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectLiteral, Utils } from 'aurora-ts-core';
import {
    {{#each schema.properties.valueObjects}}
    {{#if isI18n}}
    {{#allowI18nProperty ../schema.moduleName name}}
    {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }},
    {{/allowI18nProperty}}
    {{else}}
    {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
    {{/if}}
    {{/each}}
} from './value-objects';
{{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Created{{ toPascalCase schema.moduleName }}Event } from './../application/events/created-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Updated{{ toPascalCase schema.moduleName }}Event } from './../application/events/updated-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Deleted{{ toPascalCase schema.moduleName }}Event } from './../application/events/deleted-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ relationshipAggregate }} } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
import { {{ relationshipAggregate }} } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ relationshipAggregate }} } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ relationshipAggregate }} } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}

export class {{ schema.aggregateName }} extends AggregateRoot
{
    {{#each schema.properties.valueObjects}}
    {{#if isI18n}}
    {{#allowI18nProperty ../schema.moduleName name}}
    {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }};
    {{/allowI18nProperty}}
    {{else}}
    {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }};
    {{/if}}
    {{/each}}

    // eager relationship
    {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
    {{ toCamelCase relationshipField }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
    {{ toCamelCase nativeName }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipManyToOne}}
    {{ toCamelCase relationshipField }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipOneToMany}}
    {{ toCamelCase nativeName }}: {{ toPascalCase relationshipAggregate }}[];
    {{/each}}
    {{#each schema.properties.withRelationshipManyToMany}}
    {{ toCamelCase nativeName }}: {{ toPascalCase relationshipAggregate }}[];
    {{/each}}

    constructor(
        {{#each schema.properties.valueObjects}}
        {{#if isI18n}}
        {{#allowI18nProperty ../schema.moduleName name}}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }},
        {{/allowI18nProperty}}
        {{else}}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
        {{/if}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
    )
    {
        super();

        {{#each schema.properties.aggregate}}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}
        {{#each schema.propertiesI18n.aggregateI18n}}
        {{#if @first}}

        // i18n
        {{/if}}
        {{#allowI18nProperty ../schema.moduleName name}}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/allowI18nProperty}}
        {{/each}}

        // eager relationship
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        this.{{ toCamelCase relationshipField }} = {{ toCamelCase relationshipField }};
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        this.{{ toCamelCase nativeName }} = {{ toCamelCase nativeName }};
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        this.{{ toCamelCase relationshipField }} = {{ toCamelCase relationshipField }};
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        this.{{ toCamelCase nativeName }} = {{ toCamelCase nativeName }};
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        this.{{ toCamelCase nativeName }} = {{ toCamelCase nativeName }};
        {{/each}}
    }

    static register (
        {{#each schema.properties.aggregate}}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
        {{/each}}
        {{#each schema.propertiesI18n.aggregateI18n}}
        {{#if @first}}

        // i18n
        {{/if}}
        {{#allowI18nProperty ../schema.moduleName name}}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }},
        {{/allowI18nProperty}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
    ): {{ schema.aggregateName }}
    {
        return new {{ schema.aggregateName }}(
            {{#each schema.properties.aggregate}}
            {{ toCamelCase name }},
            {{/each}}
            {{#each schema.propertiesI18n.aggregateI18n}}
            {{#if @first}}

            // i18n
            {{/if}}
            {{#allowI18nProperty ../schema.moduleName name}}
            {{ toCamelCase name }},
            {{/allowI18nProperty}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationshipField }},
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase nativeName }},
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{ toCamelCase relationshipField }},
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            {{ toCamelCase nativeName }},
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            {{ toCamelCase nativeName }},
            {{/each}}
        );
    }

    {{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    created({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Created{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/each}}
                {{#each schema.propertiesI18n.aggregateI18n}}
                {{#if @first}}

                // i18n
                {{/if}}
                {{#allowI18nProperty ../schema.moduleName name}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/allowI18nProperty}}
                {{/each}}
            )
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event.ts'}}
    updated({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Updated{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}.value,
                {{/each}}
                {{#each schema.propertiesI18n.aggregateI18n}}
                {{#if @first}}

                // i18n
                {{/if}}
                {{#allowI18nProperty ../schema.moduleName name}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}.value,
                {{/allowI18nProperty}}
                {{/each}}
            )
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
    deleted({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Deleted{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/each}}
                {{#each schema.propertiesI18n.aggregateI18n}}
                {{#if @first}}

                // i18n
                {{/if}}
                {{#allowI18nProperty ../schema.moduleName name}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/allowI18nProperty}}
                {{/each}}
            )
        );
    }
    {{/notInArray}}

    toDTO(): ObjectLiteral
    {
        return {
            {{#each schema.properties.aggregate}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.value,
            {{/each}}
            {{#each schema.propertiesI18n.aggregateI18n}}
            {{#if @first}}

            // i18n
            {{/if}}
            {{#allowI18nProperty ../schema.moduleName name}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.value,
            {{/allowI18nProperty}}
            {{/each}}

            // eager relationship
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase nativeName }}: this.{{ toCamelCase nativeName }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            {{ toCamelCase nativeName }}: this.{{ toCamelCase nativeName }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            {{ toCamelCase nativeName }}: this.{{ toCamelCase nativeName }}?.map(item => item.toDTO()),
            {{/each}}
        };
    }

    {{#if schema.propertiesI18n.aggregateI18n}}
    toI18nDTO(): ObjectLiteral
    {
        return {
            {{#each schema.propertiesI18n.aggregateI18n}}
            {{#eq name 'id'}}
            {{ toCamelCase name }}: Utils.uuid(),
            {{else}}
            {{#isI18nRelationProperty ../schema.moduleName name}}
            {{ toCamelCase name }}: this.id.value,
            {{else}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.value,
            {{/isI18nRelationProperty}}
            {{/eq}}
            {{/each}}
        };
    }
    {{/if}}
}
