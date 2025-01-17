import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { QueueManagerJobRegistry } from './job-registry.aggregate';
import { JobRegistryId } from './value-objects';

export abstract class IJobRegistryRepository implements IRepository<QueueManagerJobRegistry>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<QueueManagerJobRegistry>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<QueueManagerJobRegistry | null>;

    // find a single record by id
    abstract findById(
        id: JobRegistryId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<QueueManagerJobRegistry | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<QueueManagerJobRegistry[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<QueueManagerJobRegistry[]>;

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
        jobRegistry: QueueManagerJobRegistry,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: QueueManagerJobRegistry) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: QueueManagerJobRegistry) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        jobsRegistry: QueueManagerJobRegistry[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: QueueManagerJobRegistry) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        jobRegistry: QueueManagerJobRegistry,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: QueueManagerJobRegistry) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        jobRegistry: QueueManagerJobRegistry,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: QueueManagerJobRegistry) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        jobRegistry: QueueManagerJobRegistry,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: QueueManagerJobRegistry) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: JobRegistryId,
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