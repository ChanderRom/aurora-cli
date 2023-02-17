import { FindSideEffectByIdQuery } from '@app/auditing/side-effect/application/find/find-side-effect-by-id.query';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { UpdateSideEffectByIdCommand } from '@app/auditing/side-effect/application/update/update-side-effect-by-id.command';
import { AuditingSideEffectEvent, AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { AuditingUpdateSideEffectByIdDto } from '../dto';

@Injectable()
export class AuditingRollbackSideEffectHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingUpdateSideEffectByIdInput | AuditingUpdateSideEffectByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        const sideEffect           = await this.queryBus.ask(new FindSideEffectByIdQuery(payload.id, constraint, { timezone }));
        const modelPath            = '../../../../' + sideEffect.modelPath;
        const now                  = Utils.nowTimestamp();
        const rollbackSideEffectId = Utils.uuid();
        const m                    = await import(modelPath);

        // set id for rollback side effect
        auditing = {
            ...auditing,
            id: rollbackSideEffectId,
        };

        switch (sideEffect.event)
        {
            case AuditingSideEffectEvent.CREATED:
                const objectCreated = await m[sideEffect.modelName]
                    .findByPk(sideEffect.auditableId);

                // eslint-disable-next-line max-len
                if (!objectCreated) throw new BadRequestException(`The object from model ${sideEffect.modelName} with id ${sideEffect.auditableId} no longer exists in the database`);

                await objectCreated.destroy({
                    auditing,
                });
                break;

            case AuditingSideEffectEvent.UPDATED:
                const objectUpdated = await m[sideEffect.modelName]
                    .findByPk(sideEffect.auditableId);

                // eslint-disable-next-line max-len
                if (!objectUpdated) throw new BadRequestException(`The object from model ${sideEffect.modelName} with id ${sideEffect.auditableId} no longer exists in the database`);

                await objectUpdated
                    .update(
                        {
                            ...sideEffect.oldValue,
                            updatedAt: now,
                        },
                        {
                            auditing,
                        },
                    );
                break;

            case AuditingSideEffectEvent.DELETED:
                await m[sideEffect.modelName]
                    .create(
                        {
                            ...sideEffect.oldValue,
                            createdAt: now,
                            updatedAt: now,
                        },
                        {
                            auditing,
                        },
                    );
                break;
        }

        await this.commandBus.dispatch(new UpdateSideEffectByIdCommand(
            {
                id        : payload.id,
                isRollback: true,
                rollbackSideEffectId,
            },
            constraint,
            {
                timezone,
            },
        ));

        return true;
    }
}