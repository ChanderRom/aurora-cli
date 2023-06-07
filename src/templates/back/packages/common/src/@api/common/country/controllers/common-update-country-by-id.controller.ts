/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto, CommonUpdateCountryByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpdateCountryByIdHandler } from '../handlers/common-update-country-by-id.handler';

@ApiTags('[common] country')
@Controller('common/country/update')
@Auth('common.country.update')
export class CommonUpdateCountryByIdController
{
    constructor(
        private readonly handler: CommonUpdateCountryByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update country by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonCountryDto })
    async main(
        @Body() payload: CommonUpdateCountryByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}