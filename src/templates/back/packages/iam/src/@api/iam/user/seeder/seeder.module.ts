// ignored file
import { Module } from '@nestjs/common';
import { SharedModule } from '@aurora/shared.module';
import { SequelizeConfigModule } from '@aurorajs.dev/core';
import { IamModule } from '@api/iam/iam.module';
import { OAuthModule } from '@api/o-auth/o-auth.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        IamModule,
        OAuthModule,
    ],
})
export class SeederModule {}