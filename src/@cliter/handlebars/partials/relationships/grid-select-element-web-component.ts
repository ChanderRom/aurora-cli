import * as handlebars from 'handlebars';

handlebars.registerPartial('gridSelectElementWebComponent',
    `<mat-form-field
    appearance="outline"
    class="{{ calculateFormGroupCol property }}"
>
    <mat-label>\\{{ t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.name }}') }}</mat-label>
    <input
        matInput
        formControlName="{{ toCamelCase property.relationship.field }}Name"
        readonly
    >
    <button
        matIconSuffix
        mat-icon-button
        type="button"
        class="mr-2"
        [aria-label]="t('Search')"
        (click)="
            actionService.action({
                id          : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.detail.{{ toCamelCase property.getRelationshipSchema.moduleNames }}OpenDialog',
                isViewAction: false
            })
        "
    >
        <mat-icon>search</mat-icon>
    </button>
    <mat-error>\\{{ formErrors?.{{ toCamelCase property.name }} | async }}</mat-error>
</mat-form-field>
<au-grid-select-element
    [columnsConfig]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}ColumnsConfig$ | async"
    [dialogTitle]="t('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase property.getRelationshipSchema.moduleName }}')"
    [gridData]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridData$ | async"
    [id]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridId"
    [originColumnsConfig]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}OriginColumnsConfig"
    #{{ toCamelCase property.getRelationshipSchema.moduleName }}GridElementSelector
>
    <au-grid-translations
        [actions]="t('Actions')"
        [AND]="t('AND')"
        [clearFilters]="t('ClearFilters')"
        [clickAndDragInfo]="t('ClickAndDragInfo')"
        [columns]="t('Columns')"
        [field]="t('Field')"
        [filter]="t('Filter')"
        [for]="{{ toCamelCase property.getRelationshipSchema.moduleNames }}GridId"
        [operator]="t('Operator')"
        [OR]="t('OR')"
        [pleaseSelectField]="t('PleaseSelectField')"
        [translations]="t('Translations')"
        [value]="t('Value')"
        [paginator]="{
            firstPageLabel: t('Paginator.FirstPageLabel'),
            itemsPerPageLabel: t('Paginator.ItemsPerPageLabel'),
            lastPageLabel: t('Paginator.LastPageLabel'),
            nextPageLabel: t('Paginator.NextPageLabel'),
            ofLabel: t('Paginator.OfLabel'),
            previousPageLabel: t('Paginator.PreviousPageLabel')
        }"
        [operators]="{
            contains: t('Operators.Contains'),
            endsWith: t('Operators.EndsWith'),
            equals: t('Operators.Equals'),
            greaterThan: t('Operators.GreaterThan'),
            greaterThanEqual: t('Operators.GreaterThanEqual'),
            lessThan: t('Operators.LessThan'),
            lessThanEqual: t('Operators.LessThanEqual'),
            notEquals: t('Operators.NotEquals'),
            startsWith: t('Operators.StartsWith')
        }"
        [actionsMenu]="{
            editCallLog: t('Edit'),
            deleteCallLog: t('Delete')
        }"
    >
        <au-grid-column-translation
            *ngFor="let columnConfig of {{ toCamelCase property.getRelationshipSchema.moduleNames }}OriginColumnsConfig"
            [field]="columnConfig.field"
        >
            \\{{ t(columnConfig.translation ? columnConfig.translation : columnConfig.field.toPascalCase()) }}
        </au-grid-column-translation>
    </au-grid-translations>
</au-grid-select-element>`);
