/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamCreateRoleHandler } from './iam-create-role.handler';

// sources
import { roles } from '@app/iam/role/infrastructure/mock/mock-role.data';

describe('IamCreateRoleHandler', () =>
{
    let handler: IamCreateRoleHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateRoleHandler,
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

        handler     = module.get<IamCreateRoleHandler>(IamCreateRoleHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateRoleHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await handler.main(roles[0])).toBe(roles[0]);
        });
    });
});