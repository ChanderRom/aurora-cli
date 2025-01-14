/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserByIdCommand } from './update-user-by-id.command';
import { UpdateUserByIdService } from './update-user-by-id.service';
import {
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserAvatar,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserMeta,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdCommandHandler implements ICommandHandler<UpdateUserByIdCommand>
{
    constructor(
        private readonly updateUserByIdService: UpdateUserByIdService,
    ) {}

    async execute(command: UpdateUserByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateUserByIdService.main(
            {
                id: new UserId(command.payload.id),
                accountId: new UserAccountId(command.payload.accountId, { undefinable: true }),
                name: new UserName(command.payload.name, { undefinable: true }),
                surname: new UserSurname(command.payload.surname),
                avatar: new UserAvatar(command.payload.avatar),
                mobile: new UserMobile(command.payload.mobile),
                langId: new UserLangId(command.payload.langId),
                username: new UserUsername(command.payload.username, { undefinable: true }),
                password: new UserPassword(command.payload.password, { undefinable: true }, { haveToEncrypt: true }),
                rememberToken: new UserRememberToken(command.payload.rememberToken),
                meta: new UserMeta(command.payload.meta),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}