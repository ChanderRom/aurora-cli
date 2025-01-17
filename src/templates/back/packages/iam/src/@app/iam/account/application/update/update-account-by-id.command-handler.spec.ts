import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';
import { UpdateAccountByIdCommandHandler } from './update-account-by-id.command-handler';
import { UpdateAccountByIdCommand } from './update-account-by-id.command';
import { UpdateAccountByIdService } from './update-account-by-id.service';

describe('UpdateAccountByIdCommandHandler', () =>
{
    let commandHandler: UpdateAccountByIdCommandHandler;
    let service: UpdateAccountByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccountByIdCommandHandler,
                {
                    provide : UpdateAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAccountByIdCommandHandler>(UpdateAccountByIdCommandHandler);
        service         = module.get<UpdateAccountByIdService>(UpdateAccountByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAccountByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAccountByIdCommand(
                    {
                        id: accounts[0].id,
                        type: accounts[0].type,
                        code: accounts[0].code,
                        email: accounts[0].email,
                        isActive: accounts[0].isActive,
                        clientId: accounts[0].clientId,
                        scopes: accounts[0].scopes,
                        dApplicationCodes: accounts[0].dApplicationCodes,
                        dPermissions: accounts[0].dPermissions,
                        dTenants: accounts[0].dTenants,
                        meta: accounts[0].meta,
                        roleIds: accounts[0].roleIds,
                        tenantIds: accounts[0].tenantIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});