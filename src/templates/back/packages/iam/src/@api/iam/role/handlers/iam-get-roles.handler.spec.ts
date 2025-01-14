/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamGetRolesHandler } from './iam-get-roles.handler';

// sources
import { roles } from '@app/iam/role/infrastructure/mock/mock-role.data';

describe('IamGetRolesHandler', () =>
{
    let handler: IamGetRolesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetRolesHandler,
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

        handler = module.get<IamGetRolesHandler>(IamGetRolesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamGetRolesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetRolesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a roles', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await handler.main()).toBe(roles);
        });
    });
});