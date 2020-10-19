import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/EnumerationService';
import constants from '../../constants';

describe('EnumerationService', () => {
    const route = `${constants.API_PREFIX_URL}/enumerations`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            id: 1,
            name: 'Country',
            values: [
                {
                    enumeration: 1,
                    enumeration_id: 1,
                    id: 1,
                    text: 'Canada',
                },
                {
                    enumeration: 1,
                    enumeration_id: 1,
                    id: 2,
                    text: 'India',
                },
                {
                    enumeration: 1,
                    enumeration_id: 1,
                    id: 3,
                    text: 'China',
                },
                {
                    enumeration: 1,
                    enumeration_id: 1,
                    id: 4,
                    text: 'Germany',
                },
            ],
        },
        {
            id: 2,
            name: 'Language',
            values: [
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 5,
                    text: 'English',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 6,
                    text: 'Mandarin',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 7,
                    text: 'Hindi',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 8,
                    text: 'German',
                },
            ],
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
        mock.onPost(`${route}/upload`).reply(config => [200, {
            data: { name: config.data.get('name') },
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
            name: 'Language',
            values: [
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 5,
                    text: 'English',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 6,
                    text: 'Mandarin',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 7,
                    text: 'Hindi',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 8,
                    text: 'German',
                },
            ],
        }));
    });

    test('update', async () => {
        const request = data[1];
        const response = await service.update(request);
        expect(response).toEqual(expect.objectContaining({
            id: 2,
            name: 'Language',
            values: [
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 5,
                    text: 'English',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 6,
                    text: 'Mandarin',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 7,
                    text: 'Hindi',
                },
                {
                    enumeration: 2,
                    enumeration_id: 2,
                    id: 8,
                    text: 'German',
                },
            ],
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

    test('import', async () => {
        const request = {
            file: [{ content: 'Hello World' }],
            name: 'example.txt',
        };
        const response = await service.import(request);
        expect(response.responseType).toEqual('arraybuffer');
        expect(response.headers).toEqual(expect.objectContaining({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'multipart/form-data',
        }));
        expect(response.data).toEqual(expect.objectContaining({ name: 'example.txt' }));
    });
});
