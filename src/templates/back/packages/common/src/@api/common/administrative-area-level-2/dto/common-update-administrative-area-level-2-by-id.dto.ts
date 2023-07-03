/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { CommonAdministrativeAreaLevel2MapType } from '@api/graphql';

export class CommonUpdateAdministrativeAreaLevel2ByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : 'f117d0ca-6c95-5bdd-9e9d-ffa16c621e74',
    })
    countryId?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel1Id [input here api field description]',
        example    : '018e2f70-60e0-5606-89d2-9380ed78e8ff',
    })
    administrativeAreaLevel1Id?: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'slug [input here api field description]',
    })
    slug?: string;

    @ApiProperty({
        type       : Number,
        description: 'latitude [input here api field description]',
    })
    latitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'longitude [input here api field description]',
    })
    longitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'zoom [input here api field description]',
    })
    zoom?: number;

    @ApiProperty({
        type       : CommonAdministrativeAreaLevel2MapType,
        enum       : ['ROADMAP','SATELLITE','HYBRID','TERRAIN'],
        description: 'mapType [input here api field description]',
        example    : CommonAdministrativeAreaLevel2MapType.TERRAIN,
    })
    mapType?: CommonAdministrativeAreaLevel2MapType;

}