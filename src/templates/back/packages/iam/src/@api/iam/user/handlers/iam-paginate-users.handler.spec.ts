/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamPaginateUsersHandler } from './iam-paginate-users.handler';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamPaginateUsersHandler', () =>
{
    let handler: IamPaginateUsersHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateUsersHandler,
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

        handler = module.get<IamPaginateUsersHandler>(IamPaginateUsersHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamPaginateUsersHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateUsersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a users', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: users.length,
                count: users.length,
                rows : users,
            })));
            expect(await handler.main()).toEqual({
                total: users.length,
                count: users.length,
                rows : users,
            });
        });
    });
});