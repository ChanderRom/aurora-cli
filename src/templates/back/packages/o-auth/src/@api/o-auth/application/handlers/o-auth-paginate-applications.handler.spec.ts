/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateApplicationsHandler } from './o-auth-paginate-applications.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';

describe('OAuthPaginateApplicationsHandler', () =>
{
    let handler: OAuthPaginateApplicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateApplicationsHandler,
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

        handler = module.get<OAuthPaginateApplicationsHandler>(OAuthPaginateApplicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthPaginateApplicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateApplicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applications', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: applications.length,
                count: applications.length,
                rows : applications,
            })));
            expect(await handler.main()).toEqual({
                total: applications.length,
                count: applications.length,
                rows : applications,
            });
        });
    });
});