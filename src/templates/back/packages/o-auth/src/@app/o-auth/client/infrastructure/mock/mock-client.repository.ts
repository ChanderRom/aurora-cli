import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { OAuthApplication } from '@app/o-auth/application/domain/application.aggregate';
import { ApplicationClientIds, ApplicationCode, ApplicationCreatedAt, ApplicationDeletedAt, ApplicationId, ApplicationIsMaster, ApplicationName, ApplicationSecret, ApplicationUpdatedAt } from '@app/o-auth/application/domain/value-objects';
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';
import { IClientRepository } from '@app/o-auth/client/domain/client.repository';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientScopeOptions,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from '@app/o-auth/client/domain/value-objects';
import { OAuthClient } from '../../domain/client.aggregate';
import { clients } from './mock-client.data';
import * as _ from 'lodash';

@Injectable()
export class MockClientRepository extends MockRepository<OAuthClient> implements IClientRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthClient';
    public collectionSource: OAuthClient[];
    public collectionApplicationsSource: OAuthApplication[];
    public deletedAtInstance: ClientDeletedAt = new ClientDeletedAt(null);

    constructor()
    {
        super();
        this.createApplicationsMockAvailableLangs();
        this.createSourceMock();
    }

    public reset(): void
    {
        this.createApplicationsMockAvailableLangs();
        this.createSourceMock();
    }

    private createSourceMock(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>clients)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthClient.register(
                new ClientId(itemCollection.id),
                new ClientGrantType(itemCollection.grantType),
                new ClientName(itemCollection.name),
                new ClientSecret(itemCollection.secret),
                new ClientAuthUrl(itemCollection.authUrl),
                new ClientRedirect(itemCollection.redirect),
                new ClientScopeOptions(itemCollection.scopeOptions),
                new ClientExpiredAccessToken(itemCollection.expiredAccessToken),
                new ClientExpiredRefreshToken(itemCollection.expiredRefreshToken),
                new ClientIsActive(itemCollection.isActive),
                new ClientIsMaster(itemCollection.isMaster),
                new ClientApplicationIds(itemCollection.applicationIds),
                new ClientCreatedAt(itemCollection.createdAt),
                new ClientUpdatedAt(itemCollection.updatedAt),
                new ClientDeletedAt(itemCollection.deletedAt),
                [],
                this.collectionApplicationsSource,
            ));
        }
    }

    private createApplicationsMockAvailableLangs(): void
    {
        this.collectionApplicationsSource = [];

        for (const application of _.orderBy(applications, ['id']))
        {
            this.collectionApplicationsSource.push(
                OAuthApplication.register(
                    new ApplicationId(application.id),
                    new ApplicationCode(application.code),
                    new ApplicationName(application.name),
                    new ApplicationSecret(application.secret),
                    new ApplicationIsMaster(application.isMaster),
                    new ApplicationClientIds(application.clientIds),
                    new ApplicationCreatedAt({ currentTimestamp: true }),
                    new ApplicationUpdatedAt({ currentTimestamp: true }),
                    new ApplicationDeletedAt(null),
                ),
            );
        }
    }
}