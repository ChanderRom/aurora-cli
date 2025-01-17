/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerPaginateQueuesResolver } from './queue-manager-paginate-queues.resolver';
import { QueueManagerPaginateQueuesHandler } from '../handlers/queue-manager-paginate-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerPaginateQueuesResolver', () =>
{
    let resolver: QueueManagerPaginateQueuesResolver;
    let handler: QueueManagerPaginateQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerPaginateQueuesResolver,
                {
                    provide : QueueManagerPaginateQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerPaginateQueuesResolver>(QueueManagerPaginateQueuesResolver);
        handler = module.get<QueueManagerPaginateQueuesHandler>(QueueManagerPaginateQueuesHandler);
    });

    test('QueueManagerPaginateQueuesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateQueuesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a queues', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : queues,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : queues,
            });
        });
    });
});