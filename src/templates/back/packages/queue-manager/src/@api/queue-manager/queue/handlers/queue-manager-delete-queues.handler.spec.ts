/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { QueueManagerDeleteQueuesHandler } from './queue-manager-delete-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerDeleteQueuesHandler', () =>
{
    let handler: QueueManagerDeleteQueuesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerDeleteQueuesHandler,
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

        handler = module.get<QueueManagerDeleteQueuesHandler>(QueueManagerDeleteQueuesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('QueueManagerDeleteQueuesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueuesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an queues deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(queues)));
            expect(await handler.main()).toBe(queues);
        });
    });
});