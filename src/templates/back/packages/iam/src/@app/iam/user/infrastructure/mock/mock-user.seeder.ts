import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
import { IamUser } from '../../domain/user.aggregate';
import { users } from './mock-user.data';
import * as _ from 'lodash';

@Injectable()
export class MockUserSeeder extends MockSeeder<IamUser>
{
    public collectionSource: IamUser[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const user of _.orderBy(users, ['id']))
        {
            this.collectionSource.push(
                IamUser.register(
                    new UserId(user.id),
                    new UserAccountId(user.accountId),
                    new UserName(user.name),
                    new UserSurname(user.surname),
                    new UserAvatar(user.avatar),
                    new UserMobile(user.mobile),
                    new UserLangId(user.langId),
                    new UserUsername(user.username),
                    new UserPassword(user.password, {}, { haveToEncrypt: true }),
                    new UserRememberToken(user.rememberToken),
                    new UserMeta(user.meta),
                    new UserCreatedAt({ currentTimestamp: true }),
                    new UserUpdatedAt({ currentTimestamp: true }),
                    new UserDeletedAt(null),
                ),
            );
        }
    }
}