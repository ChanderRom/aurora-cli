import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';
import { OAuthScope } from '../../domain/scope.aggregate';
import { scopes } from './mock-scope.data';
import * as _ from 'lodash';

@Injectable()
export class MockScopeSeeder extends MockSeeder<OAuthScope>
{
    public collectionSource: OAuthScope[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const scope of _.orderBy(scopes, ['id']))
        {
            this.collectionSource.push(
                OAuthScope.register(
                    new ScopeId(scope.id),
                    new ScopeCode(scope.code),
                    new ScopeName(scope.name),
                    new ScopeCreatedAt({ currentTimestamp: true }),
                    new ScopeUpdatedAt({ currentTimestamp: true }),
                    new ScopeDeletedAt(null),
                ),
            );
        }
    }
}