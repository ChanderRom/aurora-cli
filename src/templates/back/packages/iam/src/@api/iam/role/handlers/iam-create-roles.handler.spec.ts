import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamCreateRolesHandler } from './iam-create-roles.handler';
import { roles } from '@app/iam/role/infrastructure/mock/mock-role.data';

describe('IamCreateRolesHandler', () =>
{
    let handler: IamCreateRolesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRolesHandler,
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

        handler     = module.get<IamCreateRolesHandler>(IamCreateRolesHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateRolesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an roles created', async () =>
        {
            expect(await handler.main(roles)).toBe(true);
        });
    });
});