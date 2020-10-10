import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/AuthorizationsService';
import constants from '../../constants';

describe('AuthorizationsService', () => {
    const route = `${constants.API_PREFIX_URL}/authorization`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            authorizations: [
                {
                    category: 'Routes',
                    dependencies: [],
                    id: 1,
                    name: 'admin',
                    text: 'Grants admin routes access',
                },
            ],
            id: 1,
            immutable: true,
            name: 'Test Taker',
        },
        {
            authorizations: [
                {
                    category: 'Routes',
                    dependencies: [],
                    id: 1,
                    name: 'admin',
                    text: 'Grants admin routes access',
                },
            ],
            id: 2,
            name: 'Teacher',
        },
    ];

    beforeAll(() => {
        mock.onGet(route).reply(200, data);
        mock.onGet(`${route}?id=1`).reply(200, data[0]);
        mock.onPost(route).reply(config => [200, config.data]);
        mock.onPut(route).reply(config => [200, config.data]);
        mock.onGet(`${route}/count`).reply(200, { count: data.length });
    });

    test('prefix', () => expect(service.getUrl()).toBe(route));

    test('get', async () => {
        const response = await service.get();
        expect(response).toEqual(expect.objectContaining(data));
    });

    test('get an item', async () => {
        const response = await service.get({ id: 1 });
        expect(response).toEqual(expect.objectContaining(data[0]));
    });

    test('add', async () => {
        const request = data[1];
        const response = await service.add(request);
        expect(response).toEqual(expect.objectContaining(response));
    });

    test('update', async () => {
        const request = data[1];
        const response = await service.update(request);
        expect(response).toEqual(expect.objectContaining(response));
    });

    test('count', async () => {
        const response = await service.count();
        expect(response).toEqual(expect.objectContaining({ count: data.length }));
    });
});
