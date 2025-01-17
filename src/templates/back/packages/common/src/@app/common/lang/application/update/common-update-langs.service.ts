import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    CommonLangId,
    CommonLangName,
    CommonLangImage,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangIetf,
    CommonLangCustomCode,
    CommonLangDir,
    CommonLangSort,
    CommonLangIsActive,
    CommonLangCreatedAt,
    CommonLangUpdatedAt,
    CommonLangDeletedAt,
} from '../../domain/value-objects';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonLang } from '../../domain/common-lang.aggregate';
import { CommonAddLangsContextEvent } from '../events/common-add-langs-context.event';

@Injectable()
export class CommonUpdateLangsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonILangRepository,
    ) {}

    async main(
        payload: {
            id?: CommonLangId;
            name?: CommonLangName;
            image?: CommonLangImage;
            iso6392?: CommonLangIso6392;
            iso6393?: CommonLangIso6393;
            ietf?: CommonLangIetf;
            customCode?: CommonLangCustomCode;
            dir?: CommonLangDir;
            sort?: CommonLangSort;
            isActive?: CommonLangIsActive;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const lang = CommonLang.register(
            payload.id,
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.customCode,
            payload.dir,
            payload.sort,
            payload.isActive,
            null, // createdAt
            new CommonLangUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            lang,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const langs = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const langsRegister = this.publisher.mergeObjectContext(
            new CommonAddLangsContextEvent(langs),
        );

        langsRegister.updated(); // apply event to model events
        langsRegister.commit(); // commit all events of model
    }
}