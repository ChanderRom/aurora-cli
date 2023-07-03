/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteLangsController } from './common-delete-langs.controller';
import { CommonDeleteLangsHandler } from '../handlers/common-delete-langs.handler';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonDeleteLangsController', () =>
{
    let controller: CommonDeleteLangsController;
    let handler: CommonDeleteLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteLangsController,
            ],
            providers: [
                {
                    provide : CommonDeleteLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteLangsController>(CommonDeleteLangsController);
        handler = module.get<CommonDeleteLangsHandler>(CommonDeleteLangsHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockLangData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData)));
            expect(await controller.main()).toBe(commonMockLangData);
        });
    });
});