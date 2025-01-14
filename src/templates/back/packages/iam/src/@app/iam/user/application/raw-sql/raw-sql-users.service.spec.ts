import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLUsersService } from './raw-sql-users.service';
import { IUserRepository } from '../../domain/user.repository';
import { MockUserRepository } from '../../infrastructure/mock/mock-user.repository';

describe('RawSQLUsersService', () =>
{
    let service: RawSQLUsersService;
    let repository: IUserRepository;
    let mockRepository: MockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLUsersService,
                MockUserRepository,
                {
                    provide : IUserRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLUsersService);
        repository      = module.get(IUserRepository);
        mockRepository  = module.get(MockUserRepository);
    });

    describe('main', () =>
    {
        test('RawSQLUsersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get users', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});