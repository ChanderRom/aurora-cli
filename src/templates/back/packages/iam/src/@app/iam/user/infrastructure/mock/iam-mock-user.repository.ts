import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IamIUserRepository } from '@app/iam/user/domain/iam-user.repository';
import {
    IamUserId,
    IamUserAccountId,
    IamUserName,
    IamUserSurname,
    IamUserAvatar,
    IamUserMobile,
    IamUserLangId,
    IamUserUsername,
    IamUserPassword,
    IamUserRememberToken,
    IamUserMeta,
    IamUserCreatedAt,
    IamUserUpdatedAt,
    IamUserDeletedAt,
} from '@app/iam/user/domain/value-objects';
import { IamUser } from '../../domain/iam-user.aggregate';
import { iamMockUserData } from './iam-mock-user.data';

@Injectable()
export class IamMockUserRepository extends MockRepository<IamUser> implements IamIUserRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamUser';
    public collectionSource: IamUser[];
    public deletedAtInstance: IamUserDeletedAt = new IamUserDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>iamMockUserData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamUser.register(
                new IamUserId(itemCollection.id),
                new IamUserAccountId(itemCollection.accountId),
                new IamUserName(itemCollection.name),
                new IamUserSurname(itemCollection.surname),
                new IamUserAvatar(itemCollection.avatar),
                new IamUserMobile(itemCollection.mobile),
                new IamUserLangId(itemCollection.langId),
                new IamUserUsername(itemCollection.username),
                new IamUserPassword(itemCollection.password),
                new IamUserRememberToken(itemCollection.rememberToken),
                new IamUserMeta(itemCollection.meta),
                new IamUserCreatedAt(itemCollection.createdAt),
                new IamUserUpdatedAt(itemCollection.updatedAt),
                new IamUserDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
