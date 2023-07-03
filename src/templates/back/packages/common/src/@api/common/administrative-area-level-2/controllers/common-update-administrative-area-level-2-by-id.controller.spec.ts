/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreaLevel2ByIdController } from './common-update-administrative-area-level-2-by-id.controller';
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-update-administrative-area-level-2-by-id.handler';

// sources
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';

describe('CommonUpdateAdministrativeAreaLevel2ByIdController', () =>
{
    let controller: CommonUpdateAdministrativeAreaLevel2ByIdController;
    let handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreaLevel2ByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateAdministrativeAreaLevel2ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAdministrativeAreaLevel2ByIdController>(CommonUpdateAdministrativeAreaLevel2ByIdController);
        handler = module.get<CommonUpdateAdministrativeAreaLevel2ByIdHandler>(CommonUpdateAdministrativeAreaLevel2ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel2ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel2 updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel2Data[0])).toBe(commonMockAdministrativeAreaLevel2Data[0]);
        });
    });
});