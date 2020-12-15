import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/TestCategoryService';
import constants from '../../constants';

describe('TestCategoryService', () => {
    const route = `${constants.API_PREFIX_URL}/test_categories`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            id: 1,
            name: 'Default',
            test_type: {
                id: 1,
                name: 'Vocabulary',
            },
            test_type_id: 1,
        },
        {
            id: 2,
            name: 'Default',
            test_type: {
                id: 2,
                name: 'Reading',
            },
            test_type_id: 2,
        },
    ];
    beforeAll(() => {
        mock.onGet(route).reply(200, data);
        mock.onGet(`${route}?id=1`).reply(200, data[0]);
        mock.onPost(route).reply(config => [200, config.data]);
        mock.onPut(route).reply(config => [200, config.data]);
        mock.onGet(`${route}/count`).reply(200, { count: data.length });
        mock.onGet(`${route}/export`).reply(config => [200, {
            responseType: config.responseType,
            headers: config.headers,
        }]);
        mock.onGet(`${route}/export?id=1`).reply(config => [200, {
            responseType: config.responseType,
            headers: config.headers,
        }]);
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
        expect(response).toEqual(expect.objectContaining({
            id: 2,
            name: 'Default',
            test_type: { id: 2, name: 'Reading' },
            test_type_id: 2,
        }));
    });

    test('update', async () => {
        const request = data[1];
        const response = await service.update(request);
        expect(response).toEqual(expect.objectContaining({
            id: 2,
            name: 'Default',
            test_type: { id: 2, name: 'Reading' },
            test_type_id: 2,
        }));
    });

    test('count', async () => {
        const response = await service.count();
        expect(response).toEqual(expect.objectContaining({ count: data.length }));
    });

    test('export', async () => {
        const response = await service.export();
        expect(response.responseType).toEqual('arraybuffer');
        expect(response.headers).toEqual(expect.objectContaining({ 'Content-Type': 'blob' }));
    });

    test('export an item', async () => {
        const response = await service.export(1);
        expect(response.responseType).toEqual('arraybuffer');
        expect(response.headers).toEqual(expect.objectContaining({ 'Content-Type': 'blob' }));
    });
});
