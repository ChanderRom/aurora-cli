/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthUpdateApplicationsHandler } from './o-auth-update-applications.handler';
import { OAuthUpdateApplicationsInput } from '@api/graphql';

// sources
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';

describe('OAuthUpdateApplicationsHandler', () =>
{
    let handler: OAuthUpdateApplicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationsHandler,
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

        handler     = module.get<OAuthUpdateApplicationsHandler>(OAuthUpdateApplicationsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateApplicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await handler.main(<OAuthUpdateApplicationsInput>applications[0])).toBe(applications[0]);
        });
    });
});