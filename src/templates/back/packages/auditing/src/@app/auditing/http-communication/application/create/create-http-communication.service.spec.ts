/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';
import { CreateHttpCommunicationService } from './create-http-communication.service';
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
} from '../../domain/value-objects';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('CreateHttpCommunicationService', () =>

{
    let service: CreateHttpCommunicationService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateHttpCommunicationService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CreateHttpCommunicationService);
        repository      = module.get(IHttpCommunicationRepository);
        mockRepository  = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('CreateHttpCommunicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a httpCommunication and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new HttpCommunicationId(httpCommunications[0].id),
                    code: new HttpCommunicationCode(httpCommunications[0].code),
                    event: new HttpCommunicationEvent(httpCommunications[0].event),
                    status: new HttpCommunicationStatus(httpCommunications[0].status),
                    method: new HttpCommunicationMethod(httpCommunications[0].method),
                    url: new HttpCommunicationUrl(httpCommunications[0].url),
                    httpRequest: new HttpCommunicationHttpRequest(httpCommunications[0].httpRequest),
                    httpRequestRejected: new HttpCommunicationHttpRequestRejected(httpCommunications[0].httpRequestRejected),
                    httpResponse: new HttpCommunicationHttpResponse(httpCommunications[0].httpResponse),
                    httpResponseRejected: new HttpCommunicationHttpResponseRejected(httpCommunications[0].httpResponseRejected),
                },
            )).toBe(undefined);
        });
    });
});