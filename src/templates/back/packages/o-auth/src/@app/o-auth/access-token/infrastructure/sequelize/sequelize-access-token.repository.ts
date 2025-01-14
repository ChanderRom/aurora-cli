import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';
import { AccessTokenMapper } from '../../domain/access-token.mapper';
import { OAuthAccessTokenModel } from './sequelize-access-token.model';

@Injectable()
export class SequelizeAccessTokenRepository extends SequelizeRepository<OAuthAccessToken, OAuthAccessTokenModel> implements IAccessTokenRepository
{
    public readonly aggregateName: string = 'OAuthAccessToken';
    public readonly mapper: AccessTokenMapper = new AccessTokenMapper();

    constructor(
        @InjectModel(OAuthAccessTokenModel)
        public readonly repository: typeof OAuthAccessTokenModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}