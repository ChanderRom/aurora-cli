/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel2ByIdController } from './common-find-administrative-area-level-2-by-id.controller';
import { CommonFindAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-find-administrative-area-level-2-by-id.handler';

// sources
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';

describe('CommonFindAdministrativeAreaLevel2ByIdController', () =>
{
    let controller: CommonFindAdministrativeAreaLevel2ByIdController;
    let handler: CommonFindAdministrativeAreaLevel2ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAdministrativeAreaLevel2ByIdController,
            ],
            providers: [
                {
                    provide : CommonFindAdministrativeAreaLevel2ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAdministrativeAreaLevel2ByIdController>(CommonFindAdministrativeAreaLevel2ByIdController);
        handler = module.get<CommonFindAdministrativeAreaLevel2ByIdHandler>(CommonFindAdministrativeAreaLevel2ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel2ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel2Data[0].id)).toBe(commonMockAdministrativeAreaLevel2Data[0]);
        });
    });
});