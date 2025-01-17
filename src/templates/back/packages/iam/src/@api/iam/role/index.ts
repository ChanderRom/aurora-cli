// controllers
import { IamCreateRoleController } from './controllers/iam-create-role.controller';
import { IamCreateRolesController } from './controllers/iam-create-roles.controller';
import { IamPaginateRolesController } from './controllers/iam-paginate-roles.controller';
import { IamGetRolesController } from './controllers/iam-get-roles.controller';
import { IamFindRoleByIdController } from './controllers/iam-find-role-by-id.controller';
import { IamFindRoleController } from './controllers/iam-find-role.controller';
import { IamUpdateRoleByIdController } from './controllers/iam-update-role-by-id.controller';
import { IamUpdateRolesController } from './controllers/iam-update-roles.controller';
import { IamUpsertRoleController } from './controllers/iam-upsert-role.controller';
import { IamDeleteRoleByIdController } from './controllers/iam-delete-role-by-id.controller';
import { IamDeleteRolesController } from './controllers/iam-delete-roles.controller';

// resolvers
import { IamCreateRoleResolver } from './resolvers/iam-create-role.resolver';
import { IamCreateRolesResolver } from './resolvers/iam-create-roles.resolver';
import { IamPaginateRolesResolver } from './resolvers/iam-paginate-roles.resolver';
import { IamGetRolesResolver } from './resolvers/iam-get-roles.resolver';
import { IamFindRoleByIdResolver } from './resolvers/iam-find-role-by-id.resolver';
import { IamFindRoleResolver } from './resolvers/iam-find-role.resolver';
import { IamUpdateRoleByIdResolver } from './resolvers/iam-update-role-by-id.resolver';
import { IamUpdateRolesResolver } from './resolvers/iam-update-roles.resolver';
import { IamUpsertRoleResolver } from './resolvers/iam-upsert-role.resolver';
import { IamDeleteRoleByIdResolver } from './resolvers/iam-delete-role-by-id.resolver';
import { IamDeleteRolesResolver } from './resolvers/iam-delete-roles.resolver';

// handlers
import { IamCreateRoleHandler } from './handlers/iam-create-role.handler';
import { IamCreateRolesHandler } from './handlers/iam-create-roles.handler';
import { IamPaginateRolesHandler } from './handlers/iam-paginate-roles.handler';
import { IamGetRolesHandler } from './handlers/iam-get-roles.handler';
import { IamFindRoleByIdHandler } from './handlers/iam-find-role-by-id.handler';
import { IamFindRoleHandler } from './handlers/iam-find-role.handler';
import { IamUpdateRoleByIdHandler } from './handlers/iam-update-role-by-id.handler';
import { IamUpdateRolesHandler } from './handlers/iam-update-roles.handler';
import { IamUpsertRoleHandler } from './handlers/iam-upsert-role.handler';
import { IamDeleteRoleByIdHandler } from './handlers/iam-delete-role-by-id.handler';
import { IamDeleteRolesHandler } from './handlers/iam-delete-roles.handler';

// seeder
import { IamRoleSeeder } from './seeder/iam-role.seeder';

export const IamRoleControllers = [
    IamCreateRoleController,
    IamCreateRolesController,
    IamPaginateRolesController,
    IamGetRolesController,
    IamFindRoleByIdController,
    IamFindRoleController,
    IamUpdateRoleByIdController,
    IamUpdateRolesController,
    IamUpsertRoleController,
    IamDeleteRoleByIdController,
    IamDeleteRolesController,
];

export const IamRoleResolvers = [
    IamCreateRoleResolver,
    IamCreateRolesResolver,
    IamPaginateRolesResolver,
    IamGetRolesResolver,
    IamFindRoleByIdResolver,
    IamFindRoleResolver,
    IamUpdateRoleByIdResolver,
    IamUpdateRolesResolver,
    IamUpsertRoleResolver,
    IamDeleteRoleByIdResolver,
    IamDeleteRolesResolver,
];

export const IamRoleApiHandlers = [
    IamCreateRoleHandler,
    IamCreateRolesHandler,
    IamPaginateRolesHandler,
    IamGetRolesHandler,
    IamFindRoleByIdHandler,
    IamFindRoleHandler,
    IamUpdateRoleByIdHandler,
    IamUpdateRolesHandler,
    IamUpsertRoleHandler,
    IamDeleteRoleByIdHandler,
    IamDeleteRolesHandler,
];

export const IamRoleServices = [
    IamRoleSeeder,
];