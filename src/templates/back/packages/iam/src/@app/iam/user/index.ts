// commands
import { CreateUserCommandHandler } from './application/create/create-user.command-handler';
import { CreateUsersCommandHandler } from './application/create/create-users.command-handler';
import { UpdateUserByIdCommandHandler } from './application/update/update-user-by-id.command-handler';
import { UpdateUsersCommandHandler } from './application/update/update-users.command-handler';
import { UpsertUserCommandHandler } from './application/upsert/upsert-user.command-handler';
import { DeleteUserByIdCommandHandler } from './application/delete/delete-user-by-id.command-handler';
import { DeleteUsersCommandHandler } from './application/delete/delete-users.command-handler';

// queries
import { PaginateUsersQueryHandler } from './application/paginate/paginate-users.query-handler';
import { GetUsersQueryHandler } from './application/get/get-users.query-handler';
import { FindUserQueryHandler } from './application/find/find-user.query-handler';
import { FindUserByIdQueryHandler } from './application/find/find-user-by-id.query-handler';
import { RawSQLUsersQueryHandler } from './application/raw-sql/raw-sql-users.query-handler';

// ---- customizations ----
import { FindUserByUsernamePasswordQueryHandler } from './application/find/find-user-by-username-password.query-handler';

// events
import { CreatedUserEventHandler } from './application/events/created-user.event-handler';
import { CreatedUsersEventHandler } from './application/events/created-users.event-handler';
import { UpdatedUserEventHandler } from './application/events/updated-user.event-handler';
import { UpdatedUsersEventHandler } from './application/events/updated-users.event-handler';
import { DeletedUserEventHandler } from './application/events/deleted-user.event-handler';
import { DeletedUsersEventHandler } from './application/events/deleted-users.event-handler';

// services
import { CreateUserService } from './application/create/create-user.service';
import { CreateUsersService } from './application/create/create-users.service';
import { PaginateUsersService } from './application/paginate/paginate-users.service';
import { GetUsersService } from './application/get/get-users.service';
import { FindUserService } from './application/find/find-user.service';
import { FindUserByIdService } from './application/find/find-user-by-id.service';
import { RawSQLUsersService } from './application/raw-sql/raw-sql-users.service';
import { UpdateUserByIdService } from './application/update/update-user-by-id.service';
import { UpdateUsersService } from './application/update/update-users.service';
import { UpsertUserService } from './application/upsert/upsert-user.service';
import { DeleteUserByIdService } from './application/delete/delete-user-by-id.service';
import { DeleteUsersService } from './application/delete/delete-users.service';

// ---- customizations ----
import { FindUserByUsernamePasswordService } from './application/find/find-user-by-username-password.service';

// models
export { IamUserModel } from './infrastructure/sequelize/sequelize-user.model';

// repository
export { IUserRepository } from './domain/user.repository';
export { SequelizeUserRepository } from './infrastructure/sequelize/sequelize-user.repository';

// sagas
export { UserSagas } from './application/sagas/user.sagas';

export const IamUserHandlers = [
    // commands
    CreateUserCommandHandler,
    CreateUsersCommandHandler,
    UpdateUserByIdCommandHandler,
    UpdateUsersCommandHandler,
    UpsertUserCommandHandler,
    DeleteUserByIdCommandHandler,
    DeleteUsersCommandHandler,

    // queries
    PaginateUsersQueryHandler,
    GetUsersQueryHandler,
    FindUserQueryHandler,
    FindUserByIdQueryHandler,
    RawSQLUsersQueryHandler,

    // ---- customizations ----
    FindUserByUsernamePasswordQueryHandler,

    // events
    CreatedUserEventHandler,
    CreatedUsersEventHandler,
    UpdatedUserEventHandler,
    UpdatedUsersEventHandler,
    DeletedUserEventHandler,
    DeletedUsersEventHandler,
];

export const IamUserServices = [
    CreateUserService,
    CreateUsersService,
    PaginateUsersService,
    GetUsersService,
    FindUserService,
    FindUserByIdService,
    RawSQLUsersService,
    UpdateUserByIdService,
    UpdateUsersService,
    UpsertUserService,
    DeleteUserByIdService,
    DeleteUsersService,

    // ---- customizations ----
    FindUserByUsernamePasswordService,
];