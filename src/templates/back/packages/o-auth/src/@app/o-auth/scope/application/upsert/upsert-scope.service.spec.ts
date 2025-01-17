/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { scopes } from '@app/o-auth/scope/infrastructure/mock/mock-scope.data';
import { UpsertScopeService } from './upsert-scope.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';
import { IScopeRepository } from '../../domain/scope.repository';
import { MockScopeRepository } from '../../infrastructure/mock/mock-scope.repository';

describe('UpsertScopeService', () =>

{
    let service: UpsertScopeService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpsertScopeService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpsertScopeService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('UpsertScopeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a scope and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ScopeId(scopes[0].id),
                    code: new ScopeCode(scopes[0].code),
                    name: new ScopeName(scopes[0].name),
                },
            )).toBe(undefined);
        });
    });
});