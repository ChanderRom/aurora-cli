import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteScopeByIdCommandHandler } from './delete-scope-by-id.command-handler';
import { scopes } from '@app/o-auth/scope/infrastructure/mock/mock-scope.data';
import { DeleteScopeByIdCommand } from './delete-scope-by-id.command';
import { DeleteScopeByIdService } from './delete-scope-by-id.service';

describe('DeleteScopeByIdCommandHandler', () =>
{
    let commandHandler: DeleteScopeByIdCommandHandler;
    let service: DeleteScopeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteScopeByIdCommandHandler,
                {
                    provide : DeleteScopeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteScopeByIdCommandHandler>(DeleteScopeByIdCommandHandler);
        service         = module.get<DeleteScopeByIdService>(DeleteScopeByIdService);
    });

    describe('main', () =>
    {
        test('DeleteScopeByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteScopeByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteScopeByIdCommand(
                    scopes[0].id,
                ),
            )).toBe(undefined);
        });
    });
});