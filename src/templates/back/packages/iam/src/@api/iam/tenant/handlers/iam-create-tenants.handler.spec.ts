import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamCreateTenantsHandler } from './iam-create-tenants.handler';
import { tenants } from '@app/iam/tenant/infrastructure/mock/mock-tenant.data';

describe('IamCreateTenantsHandler', () =>
{
    let handler: IamCreateTenantsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsHandler,
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

        handler     = module.get<IamCreateTenantsHandler>(IamCreateTenantsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateTenantsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an tenants created', async () =>
        {
            expect(await handler.main(tenants)).toBe(true);
        });
    });
});