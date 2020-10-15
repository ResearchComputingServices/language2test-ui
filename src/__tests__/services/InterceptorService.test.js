import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/InterceptorService';
import constants from '../../constants';

describe('AuthorizationsService', () => {
    const route = `${constants.API_PREFIX_URL}`;
    const mock = new MockAdapter(axios);

    beforeAll(() => {
        mock.onGet(route).reply(200);
        mock.onGet('route/unauthorized').reply(401);
        mock.onGet('route/unhandled').timeout();
    });

    test('registerRequestInterceptor', async () => {
        expect(() => service.registerRequestInterceptor()).toThrow(Error);
        const token = 'Bearer zxck123lkjzxcml';
        service.registerRequestInterceptor(request => (request.headers.Authorization = token));
        const response = await axios.get(route);
        expect(response.config.headers.Authorization).toEqual(token);
    });
    test('registerUnauthorizedInterceptor', async () => {
        let changed = false;
        expect(() => service.registerUnauthorizedInterceptor()).toThrow(Error);
        service.registerUnauthorizedInterceptor(() => (changed = !changed));
        await axios.get('route/unauthorized');
        expect(changed).toEqual(true);
    });
    test('registerUnhandledInterceptor', async () => {
        expect(() => service.registerUnhandledInterceptor()).toThrow(Error);
        let changed = false;
        service.registerUnhandledInterceptor(() => (changed = !changed));
        await axios.get('route/unhandled').catch(() => {
            expect(changed).toEqual(true);
        });
    });
    test('registerDataTransformInterceptor', async () => {
        const data = [
            {
                primaryKey: 'jim',
                databaseRecords: [
                    { firstName: 'jim', bankAmount: 34, createdDate: '11/12/2015' },
                    { firstName: 'jim', bankAmount: 45, createdDate: '12/01/2015' },
                ],
            },
            {
                primaryKey: 'carl',
                databaseRecords: [
                    { firstName: 'carl', bankAmount: 120.11, createdDate: '11/12/2015' },
                ],
            },
            {
                primaryKey: 'stacy',
                databaseRecords: [
                    { firstName: 'stacy', bankAmount: 12.00, createdDate: '01/04/2016' },
                    { firstName: 'stacy', bankAmount: 34.10, createdDate: '01/04/2016' },
                    { firstName: 'stacy', bankAmount: 44.80, createdDate: '01/05/2016' },
                ],
            },
        ];
        service.registerDataTransformInterceptor();
        mock.onPost('route/transform').reply(config => {
            const transformedData = JSON.parse(config.data);
            expect(transformedData).toEqual(expect.arrayContaining([
                {
                    primary_key: 'jim',
                    database_records: [
                        { first_name: 'jim', bank_amount: 34, created_date: '11/12/2015' },
                        { first_name: 'jim', bank_amount: 45, created_date: '12/01/2015' },
                    ],
                },
                {
                    primary_key: 'carl',
                    database_records: [
                        { first_name: 'carl', bank_amount: 120.11, created_date: '11/12/2015' },
                    ],
                },
                {
                    primary_key: 'stacy',
                    database_records: [
                        { first_name: 'stacy', bank_amount: 12.00, created_date: '01/04/2016' },
                        { first_name: 'stacy', bank_amount: 34.10, created_date: '01/04/2016' },
                        { first_name: 'stacy', bank_amount: 44.80, created_date: '01/05/2016' },
                    ],
                },
            ]));
            return [200, config.data, { 'content-type': 'application/json' }];
        });
        const response = await axios.post('route/transform', data);
        expect(response.data).toEqual(expect.arrayContaining(data));
    });
});
