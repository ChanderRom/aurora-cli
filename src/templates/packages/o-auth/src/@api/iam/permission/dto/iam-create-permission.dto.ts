/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamCreatePermissionDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'boundedContextId [input here api field description]',
        example    : '854ef06e-da9b-4247-b61c-4dc9aee96fce',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : [String],
        description: 'roles [input here api field description]',
    })
    roleIds?: string[];

}