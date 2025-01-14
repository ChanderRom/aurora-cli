/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamPaginatePermissionsHandler } from './iam-paginate-permissions.handler';

// sources
import { permissions } from '@app/iam/permission/infrastructure/mock/mock-permission.data';

describe('IamPaginatePermissionsHandler', () =>
{
    let handler: IamPaginatePermissionsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginatePermissionsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamPaginatePermissionsHandler>(IamPaginatePermissionsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamPaginatePermissionsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginatePermissionsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a permissions', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: permissions.length,
                count: permissions.length,
                rows : permissions,
            })));
            expect(await handler.main()).toEqual({
                total: permissions.length,
                count: permissions.length,
                rows : permissions,
            });
        });
    });
});