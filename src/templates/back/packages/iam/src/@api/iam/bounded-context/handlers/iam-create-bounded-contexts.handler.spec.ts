import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamCreateBoundedContextsHandler } from './iam-create-bounded-contexts.handler';
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';

describe('IamCreateBoundedContextsHandler', () =>
{
    let handler: IamCreateBoundedContextsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextsHandler,
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

        handler     = module.get<IamCreateBoundedContextsHandler>(IamCreateBoundedContextsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an boundedContexts created', async () =>
        {
            expect(await handler.main(boundedContexts)).toBe(true);
        });
    });
});