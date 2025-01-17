/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
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
} from './value-objects';
import { CreatedClientEvent } from '../application/events/created-client.event';
import { UpdatedClientEvent } from '../application/events/updated-client.event';
import { DeletedClientEvent } from '../application/events/deleted-client.event';
import { OAuthAccessToken } from '@app/o-auth/access-token/domain/access-token.aggregate';
import { OAuthApplication } from '@app/o-auth/application/domain/application.aggregate';

export class OAuthClient extends AggregateRoot
{
    id: ClientId;
    grantType: ClientGrantType;
    name: ClientName;
    secret: ClientSecret;
    authUrl: ClientAuthUrl;
    redirect: ClientRedirect;
    scopeOptions: ClientScopeOptions;
    expiredAccessToken: ClientExpiredAccessToken;
    expiredRefreshToken: ClientExpiredRefreshToken;
    isActive: ClientIsActive;
    isMaster: ClientIsMaster;
    applicationIds: ClientApplicationIds;
    createdAt: ClientCreatedAt;
    updatedAt: ClientUpdatedAt;
    deletedAt: ClientDeletedAt;

    // eager relationship
    accessTokens: OAuthAccessToken[];
    applications: OAuthApplication[];

    constructor(
        id: ClientId,
        grantType: ClientGrantType,
        name: ClientName,
        secret: ClientSecret,
        authUrl: ClientAuthUrl,
        redirect: ClientRedirect,
        scopeOptions: ClientScopeOptions,
        expiredAccessToken: ClientExpiredAccessToken,
        expiredRefreshToken: ClientExpiredRefreshToken,
        isActive: ClientIsActive,
        isMaster: ClientIsMaster,
        applicationIds: ClientApplicationIds,
        createdAt: ClientCreatedAt,
        updatedAt: ClientUpdatedAt,
        deletedAt: ClientDeletedAt,

        accessTokens?: OAuthAccessToken[],
        applications?: OAuthApplication[],
    )
    {
        super();
        this.id = id;
        this.grantType = grantType;
        this.name = name;
        this.secret = secret;
        this.authUrl = authUrl;
        this.redirect = redirect;
        this.scopeOptions = scopeOptions;
        this.expiredAccessToken = expiredAccessToken;
        this.expiredRefreshToken = expiredRefreshToken;
        this.isActive = isActive;
        this.isMaster = isMaster;
        this.applicationIds = applicationIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.accessTokens = accessTokens;
        this.applications = applications;
    }

    static register (
        id: ClientId,
        grantType: ClientGrantType,
        name: ClientName,
        secret: ClientSecret,
        authUrl: ClientAuthUrl,
        redirect: ClientRedirect,
        scopeOptions: ClientScopeOptions,
        expiredAccessToken: ClientExpiredAccessToken,
        expiredRefreshToken: ClientExpiredRefreshToken,
        isActive: ClientIsActive,
        isMaster: ClientIsMaster,
        applicationIds: ClientApplicationIds,
        createdAt: ClientCreatedAt,
        updatedAt: ClientUpdatedAt,
        deletedAt: ClientDeletedAt,

        accessTokens?: OAuthAccessToken[],
        applications?: OAuthApplication[],
    ): OAuthClient
    {
        return new OAuthClient(
            id,
            grantType,
            name,
            secret,
            authUrl,
            redirect,
            scopeOptions,
            expiredAccessToken,
            expiredRefreshToken,
            isActive,
            isMaster,
            applicationIds,
            createdAt,
            updatedAt,
            deletedAt,

            accessTokens,
            applications,
        );
    }

    created(client: OAuthClient): void
    {
        this.apply(
            new CreatedClientEvent(
                client.id.value,
                client.grantType.value,
                client.name.value,
                client.secret.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.scopeOptions?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isActive.value,
                client.isMaster.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
            ),
        );
    }

    updated(client: OAuthClient): void
    {
        this.apply(
            new UpdatedClientEvent(
                client.id?.value,
                client.grantType?.value,
                client.name?.value,
                client.secret?.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.scopeOptions?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isActive?.value,
                client.isMaster?.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
            ),
        );
    }

    deleted(client: OAuthClient): void
    {
        this.apply(
            new DeletedClientEvent(
                client.id.value,
                client.grantType.value,
                client.name.value,
                client.secret.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.scopeOptions?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isActive.value,
                client.isMaster.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            grantType: this.grantType.value,
            name: this.name.value,
            secret: this.secret.value,
            authUrl: this.authUrl?.value,
            redirect: this.redirect?.value,
            scopeOptions: this.scopeOptions?.value,
            expiredAccessToken: this.expiredAccessToken?.value,
            expiredRefreshToken: this.expiredRefreshToken?.value,
            isActive: this.isActive.value,
            isMaster: this.isMaster.value,
            applicationIds: this.applicationIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            accessTokens: this.accessTokens?.map(item => item.toDTO()),
            applications: this.applications?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            grantType: this.grantType.value,
            name: this.name.value,
            secret: this.secret.value,
            authUrl: this.authUrl?.value,
            redirect: this.redirect?.value,
            scopeOptions: this.scopeOptions?.value,
            expiredAccessToken: this.expiredAccessToken?.value,
            expiredRefreshToken: this.expiredRefreshToken?.value,
            isActive: this.isActive.value,
            isMaster: this.isMaster.value,
            applicationIds: this.applicationIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            accessTokens: this.accessTokens?.map(item => item.toDTO()),
            applications: this.applications?.map(item => item.toDTO()),
        };
    }
}
