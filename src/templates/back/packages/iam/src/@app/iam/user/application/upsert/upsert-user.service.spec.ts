/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';
import { UpsertUserService } from './upsert-user.service';
import {
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserAvatar,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserMeta,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '../../domain/value-objects';
import { IUserRepository } from '../../domain/user.repository';
import { MockUserRepository } from '../../infrastructure/mock/mock-user.repository';

describe('UpsertUserService', () =>

{
    let service: UpsertUserService;
    let repository: IUserRepository;
    let mockRepository: MockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpsertUserService,
                MockUserRepository,
                {
                    provide : IUserRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpsertUserService);
        repository      = module.get(IUserRepository);
        mockRepository  = module.get(MockUserRepository);
    });

    describe('main', () =>
    {
        test('UpsertUserService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a user and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new UserId(users[0].id),
                    accountId: new UserAccountId(users[0].accountId),
                    name: new UserName(users[0].name),
                    surname: new UserSurname(users[0].surname),
                    avatar: new UserAvatar(users[0].avatar),
                    mobile: new UserMobile(users[0].mobile),
                    langId: new UserLangId(users[0].langId),
                    username: new UserUsername(users[0].username),
                    password: new UserPassword(users[0].password),
                    rememberToken: new UserRememberToken(users[0].rememberToken),
                    meta: new UserMeta(users[0].meta),
                },
            )).toBe(undefined);
        });
    });
});