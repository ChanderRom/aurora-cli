import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
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
import { IamUser } from '../../domain/user.aggregate';

@Injectable()
export class CreateUserService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository,
    ) {}

    async main(
        payload: {
            id: UserId;
            accountId: UserAccountId;
            name: UserName;
            surname: UserSurname;
            avatar: UserAvatar;
            mobile: UserMobile;
            langId: UserLangId;
            username: UserUsername;
            password: UserPassword;
            rememberToken: UserRememberToken;
            meta: UserMeta;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const user = IamUser.register(
            payload.id,
            payload.accountId,
            payload.name,
            payload.surname,
            payload.avatar,
            payload.mobile,
            payload.langId,
            payload.username,
            payload.password,
            payload.rememberToken,
            payload.meta,
            new UserCreatedAt({ currentTimestamp: true }),
            new UserUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(user, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const userRegister = this.publisher.mergeObjectContext(
            user,
        );

        userRegister.created(user); // apply event to model events
        userRegister.commit(); // commit all events of model
    }
}