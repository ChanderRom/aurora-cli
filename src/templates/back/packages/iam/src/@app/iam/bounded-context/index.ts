// commands
import { CreateBoundedContextCommandHandler } from './application/create/create-bounded-context.command-handler';
import { CreateBoundedContextsCommandHandler } from './application/create/create-bounded-contexts.command-handler';
import { UpdateBoundedContextByIdCommandHandler } from './application/update/update-bounded-context-by-id.command-handler';
import { UpdateBoundedContextsCommandHandler } from './application/update/update-bounded-contexts.command-handler';
import { UpsertBoundedContextCommandHandler } from './application/upsert/upsert-bounded-context.command-handler';
import { DeleteBoundedContextByIdCommandHandler } from './application/delete/delete-bounded-context-by-id.command-handler';
import { DeleteBoundedContextsCommandHandler } from './application/delete/delete-bounded-contexts.command-handler';

// queries
import { PaginateBoundedContextsQueryHandler } from './application/paginate/paginate-bounded-contexts.query-handler';
import { GetBoundedContextsQueryHandler } from './application/get/get-bounded-contexts.query-handler';
import { FindBoundedContextQueryHandler } from './application/find/find-bounded-context.query-handler';
import { FindBoundedContextByIdQueryHandler } from './application/find/find-bounded-context-by-id.query-handler';
import { RawSQLBoundedContextsQueryHandler } from './application/raw-sql/raw-sql-bounded-contexts.query-handler';

// events
import { CreatedBoundedContextEventHandler } from './application/events/created-bounded-context.event-handler';
import { CreatedBoundedContextsEventHandler } from './application/events/created-bounded-contexts.event-handler';
import { UpdatedBoundedContextEventHandler } from './application/events/updated-bounded-context.event-handler';
import { UpdatedBoundedContextsEventHandler } from './application/events/updated-bounded-contexts.event-handler';
import { DeletedBoundedContextEventHandler } from './application/events/deleted-bounded-context.event-handler';
import { DeletedBoundedContextsEventHandler } from './application/events/deleted-bounded-contexts.event-handler';

// services
import { CreateBoundedContextService } from './application/create/create-bounded-context.service';
import { CreateBoundedContextsService } from './application/create/create-bounded-contexts.service';
import { PaginateBoundedContextsService } from './application/paginate/paginate-bounded-contexts.service';
import { GetBoundedContextsService } from './application/get/get-bounded-contexts.service';
import { FindBoundedContextService } from './application/find/find-bounded-context.service';
import { FindBoundedContextByIdService } from './application/find/find-bounded-context-by-id.service';
import { RawSQLBoundedContextsService } from './application/raw-sql/raw-sql-bounded-contexts.service';
import { UpdateBoundedContextByIdService } from './application/update/update-bounded-context-by-id.service';
import { UpdateBoundedContextsService } from './application/update/update-bounded-contexts.service';
import { UpsertBoundedContextService } from './application/upsert/upsert-bounded-context.service';
import { DeleteBoundedContextByIdService } from './application/delete/delete-bounded-context-by-id.service';
import { DeleteBoundedContextsService } from './application/delete/delete-bounded-contexts.service';

// models
export { IamBoundedContextModel } from './infrastructure/sequelize/sequelize-bounded-context.model';

// repository
export { IBoundedContextRepository } from './domain/bounded-context.repository';
export { SequelizeBoundedContextRepository } from './infrastructure/sequelize/sequelize-bounded-context.repository';

// sagas
export { BoundedContextSagas } from './application/sagas/bounded-context.sagas';

export const IamBoundedContextHandlers = [
    // commands
    CreateBoundedContextCommandHandler,
    CreateBoundedContextsCommandHandler,
    UpdateBoundedContextByIdCommandHandler,
    UpdateBoundedContextsCommandHandler,
    UpsertBoundedContextCommandHandler,
    DeleteBoundedContextByIdCommandHandler,
    DeleteBoundedContextsCommandHandler,

    // queries
    PaginateBoundedContextsQueryHandler,
    GetBoundedContextsQueryHandler,
    FindBoundedContextQueryHandler,
    FindBoundedContextByIdQueryHandler,
    RawSQLBoundedContextsQueryHandler,

    // events
    CreatedBoundedContextEventHandler,
    CreatedBoundedContextsEventHandler,
    UpdatedBoundedContextEventHandler,
    UpdatedBoundedContextsEventHandler,
    DeletedBoundedContextEventHandler,
    DeletedBoundedContextsEventHandler,
];

export const IamBoundedContextServices = [
    CreateBoundedContextService,
    CreateBoundedContextsService,
    PaginateBoundedContextsService,
    GetBoundedContextsService,
    FindBoundedContextService,
    FindBoundedContextByIdService,
    RawSQLBoundedContextsService,
    UpdateBoundedContextByIdService,
    UpdateBoundedContextsService,
    UpsertBoundedContextService,
    DeleteBoundedContextByIdService,
    DeleteBoundedContextsService,
];