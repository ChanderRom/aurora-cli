import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateTenantsController } from './iam-create-tenants.controller';
import { IamCreateTenantsHandler } from '../handlers/iam-create-tenants.handler';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/mock/mock-tenant.data';

describe('IamCreateTenantsController', () =>
{
    let controller: IamCreateTenantsController;
    let handler: IamCreateTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateTenantsController,
            ],
            providers: [
                {
                    provide : IamCreateTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreateTenantsController>(IamCreateTenantsController);
        handler = module.get<IamCreateTenantsHandler>(IamCreateTenantsHandler);
    });

    describe('main', () =>
    {
        test('IamCreateTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenants created', async () =>
        {
            expect(await controller.main(tenants)).toBe(undefined);
        });
    });
});