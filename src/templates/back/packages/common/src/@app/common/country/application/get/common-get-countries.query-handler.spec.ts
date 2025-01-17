import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetCountriesQueryHandler } from './common-get-countries.query-handler';
import { CommonMockCountryRepository } from '@app/common/country/infrastructure/mock/common-mock-country.repository';
import { CommonICountryRepository } from '@app/common/country/domain/common-country.repository';
import { CommonCountryMapper } from '@app/common/country/domain/common-country.mapper';
import { CommonGetCountriesQuery } from './common-get-countries.query';
import { CommonGetCountriesService } from './common-get-countries.service';

describe('GetCountriesQueryHandler', () =>
{
    let queryHandler: CommonGetCountriesQueryHandler;
    let service: CommonGetCountriesService;
    let repository: CommonMockCountryRepository;
    let mapper: CommonCountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonGetCountriesQueryHandler,
                {
                    provide : CommonICountryRepository,
                    useClass: CommonMockCountryRepository,
                },
                {
                    provide : CommonGetCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonGetCountriesQueryHandler>(CommonGetCountriesQueryHandler);
        service = module.get<CommonGetCountriesService>(CommonGetCountriesService);
        repository = <CommonMockCountryRepository>module.get<CommonICountryRepository>(CommonICountryRepository);
        mapper = new CommonCountryMapper();
    });

    describe('main', () =>
    {
        test('CommonGetCountriesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an countries founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonGetCountriesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});