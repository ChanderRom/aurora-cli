import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { IamBoundedContext } from './bounded-context.aggregate';
import { BoundedContextId } from './value-objects';

export abstract class IBoundedContextRepository implements IRepository<IamBoundedContext>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamBoundedContext>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamBoundedContext | null>;

    // find a single record by id
    abstract findById(
        id: BoundedContextId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamBoundedContext | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamBoundedContext[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamBoundedContext[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        boundedContext: IamBoundedContext,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: IamBoundedContext) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        boundedContexts: IamBoundedContext[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        boundedContext: IamBoundedContext,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        boundedContext: IamBoundedContext,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        boundedContext: IamBoundedContext,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: BoundedContextId,
        options?: {
            deleteOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            deleteOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}