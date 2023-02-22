/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurora-ts/core';
import {
    HttpCommunicationId,
    HttpCommunicationCode,
    HttpCommunicationEvent,
    HttpCommunicationStatus,
    HttpCommunicationMethod,
    HttpCommunicationUrl,
    HttpCommunicationHttpRequest,
    HttpCommunicationHttpRequestRejected,
    HttpCommunicationHttpResponse,
    HttpCommunicationHttpResponseRejected,
    HttpCommunicationCreatedAt,
    HttpCommunicationUpdatedAt,
    HttpCommunicationDeletedAt,
} from './value-objects';
import { CreatedHttpCommunicationEvent } from '../application/events/created-http-communication.event';
import { UpdatedHttpCommunicationEvent } from '../application/events/updated-http-communication.event';
import { DeletedHttpCommunicationEvent } from '../application/events/deleted-http-communication.event';

export class AuditingHttpCommunication extends AggregateRoot
{
    id: HttpCommunicationId;
    code: HttpCommunicationCode;
    event: HttpCommunicationEvent;
    status: HttpCommunicationStatus;
    method: HttpCommunicationMethod;
    url: HttpCommunicationUrl;
    httpRequest: HttpCommunicationHttpRequest;
    httpRequestRejected: HttpCommunicationHttpRequestRejected;
    httpResponse: HttpCommunicationHttpResponse;
    httpResponseRejected: HttpCommunicationHttpResponseRejected;
    createdAt: HttpCommunicationCreatedAt;
    updatedAt: HttpCommunicationUpdatedAt;
    deletedAt: HttpCommunicationDeletedAt;

    // eager relationship

    constructor(
        id: HttpCommunicationId,
        code: HttpCommunicationCode,
        event: HttpCommunicationEvent,
        status: HttpCommunicationStatus,
        method: HttpCommunicationMethod,
        url: HttpCommunicationUrl,
        httpRequest: HttpCommunicationHttpRequest,
        httpRequestRejected: HttpCommunicationHttpRequestRejected,
        httpResponse: HttpCommunicationHttpResponse,
        httpResponseRejected: HttpCommunicationHttpResponseRejected,
        createdAt: HttpCommunicationCreatedAt,
        updatedAt: HttpCommunicationUpdatedAt,
        deletedAt: HttpCommunicationDeletedAt,

    )
    {
        super();
        this.id = id;
        this.code = code;
        this.event = event;
        this.status = status;
        this.method = method;
        this.url = url;
        this.httpRequest = httpRequest;
        this.httpRequestRejected = httpRequestRejected;
        this.httpResponse = httpResponse;
        this.httpResponseRejected = httpResponseRejected;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: HttpCommunicationId,
        code: HttpCommunicationCode,
        event: HttpCommunicationEvent,
        status: HttpCommunicationStatus,
        method: HttpCommunicationMethod,
        url: HttpCommunicationUrl,
        httpRequest: HttpCommunicationHttpRequest,
        httpRequestRejected: HttpCommunicationHttpRequestRejected,
        httpResponse: HttpCommunicationHttpResponse,
        httpResponseRejected: HttpCommunicationHttpResponseRejected,
        createdAt: HttpCommunicationCreatedAt,
        updatedAt: HttpCommunicationUpdatedAt,
        deletedAt: HttpCommunicationDeletedAt,

    ): AuditingHttpCommunication
    {
        return new AuditingHttpCommunication(
            id,
            code,
            event,
            status,
            method,
            url,
            httpRequest,
            httpRequestRejected,
            httpResponse,
            httpResponseRejected,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(httpCommunication: AuditingHttpCommunication): void
    {
        this.apply(
            new CreatedHttpCommunicationEvent(
                httpCommunication.id.value,
                httpCommunication.code?.value,
                httpCommunication.event.value,
                httpCommunication.status?.value,
                httpCommunication.method.value,
                httpCommunication.url.value,
                httpCommunication.httpRequest?.value,
                httpCommunication.httpRequestRejected?.value,
                httpCommunication.httpResponse?.value,
                httpCommunication.httpResponseRejected?.value,
                httpCommunication.createdAt?.value,
                httpCommunication.updatedAt?.value,
                httpCommunication.deletedAt?.value,
            ),
        );
    }

    updated(httpCommunication: AuditingHttpCommunication): void
    {
        this.apply(
            new UpdatedHttpCommunicationEvent(
                httpCommunication.id?.value,
                httpCommunication.code?.value,
                httpCommunication.event?.value,
                httpCommunication.status?.value,
                httpCommunication.method?.value,
                httpCommunication.url?.value,
                httpCommunication.httpRequest?.value,
                httpCommunication.httpRequestRejected?.value,
                httpCommunication.httpResponse?.value,
                httpCommunication.httpResponseRejected?.value,
                httpCommunication.createdAt?.value,
                httpCommunication.updatedAt?.value,
                httpCommunication.deletedAt?.value,
            ),
        );
    }

    deleted(httpCommunication: AuditingHttpCommunication): void
    {
        this.apply(
            new DeletedHttpCommunicationEvent(
                httpCommunication.id.value,
                httpCommunication.code?.value,
                httpCommunication.event.value,
                httpCommunication.status?.value,
                httpCommunication.method.value,
                httpCommunication.url.value,
                httpCommunication.httpRequest?.value,
                httpCommunication.httpRequestRejected?.value,
                httpCommunication.httpResponse?.value,
                httpCommunication.httpResponseRejected?.value,
                httpCommunication.createdAt?.value,
                httpCommunication.updatedAt?.value,
                httpCommunication.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code?.value,
            event: this.event.value,
            status: this.status?.value,
            method: this.method.value,
            url: this.url.value,
            httpRequest: this.httpRequest?.value,
            httpRequestRejected: this.httpRequestRejected?.value,
            httpResponse: this.httpResponse?.value,
            httpResponseRejected: this.httpResponseRejected?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code?.value,
            event: this.event.value,
            status: this.status?.value,
            method: this.method.value,
            url: this.url.value,
            httpRequest: this.httpRequest?.value,
            httpRequestRejected: this.httpRequestRejected?.value,
            httpResponse: this.httpResponse?.value,
            httpResponseRejected: this.httpResponseRejected?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}