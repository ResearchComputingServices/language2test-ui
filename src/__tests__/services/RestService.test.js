import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import RestService from '../../services/RestService';
import constants from '../../constants';

class MockService extends RestService {
    prefix = `${this.prefix}/mock`;

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    count = this._count;

    export = this._export;

    import = this._import;
}

describe('RestService', () => {
    let mockService;
    const route = `${constants.API_PREFIX_URL}/mock`;
    const mock = new MockAdapter(axios);

    beforeAll(() => {
        mock.onGet(route).reply(200, {
            mocks: [{
                id: 1,
                text: 'Lorem Ipsum',
            }],
        });
        mock.onGet(`${route}?id=1`).reply(200, {
            id: 1,
            text: 'Lorem Ipsum',
        });
        mock.onPost(route).reply(config => [200, config.data]);
        mock.onPut(route).reply(config => [200, config.data]);
        mock.onGet(`${route}/count`).reply(200, { count: 7 });
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
        mock.onGet(`${route}?id=7`).reply(200, {
            id: 1,
            items: ['Lorem Ipsum'],
        });
    });

    beforeEach(() => {
        mockService = new MockService();
    });

    test('prefix', () => expect(mockService.getUrl()).toBe(route));

    test('get', async () => {
        const response = await mockService.get();
        expect(response).toEqual(expect.objectContaining({
            mocks: [{
                id: 1,
                text: 'Lorem Ipsum',
            }],
        }));
    });

    test('get an item', async () => {
        const response = await mockService.get({ id: 1 });
        expect(response).toEqual(expect.objectContaining({
            id: 1,
            text: 'Lorem Ipsum',
        }));
    });

    test('add', async () => {
        const request = {
            id: 1,
            text: 'Something to add',
        };
        const response = await mockService.add(request);
        expect(response).toEqual(expect.objectContaining(response));
    });

    test('update', async () => {
        const request = {
            id: 1,
            text: 'Something to update',
        };
        const response = await mockService.update(request);
        expect(response).toEqual(expect.objectContaining(response));
    });

    test('count', async () => {
        const response = await mockService.count();
        expect(response).toEqual(expect.objectContaining({ count: 7 }));
    });

    test('export', async () => {
        const response = await mockService.export();
        expect(response.responseType).toEqual('arraybuffer');
        expect(response.headers).toEqual(expect.objectContaining({ 'Content-Type': 'blob' }));
    });

    test('export an item', async () => {
        const response = await mockService.export(1);
        expect(response.responseType).toEqual('arraybuffer');
        expect(response.headers).toEqual(expect.objectContaining({ 'Content-Type': 'blob' }));
    });

    test('import', async () => {
        const request = {
            file: [{ content: 'Hello World' }],
            name: 'example.txt',
        };
        const response = await mockService.import(request);
        expect(response.responseType).toEqual('arraybuffer');
        expect(response.headers).toEqual(expect.objectContaining({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'multipart/form-data',
        }));
        expect(response.data).toEqual(expect.objectContaining({ name: 'example.txt' }));
    });

    test('request transformer', async () => {
        const request = {
            id: 1,
            text: 'Something to add',
        };
        const response = await mockService.add(request, { requestTransformers: [data => _.omit(data, ['id'])] });
        expect(response).not.toBe(expect.objectContaining({ id: 1, text: 'Something to add' }));
        expect(response).toEqual(expect.objectContaining({ text: 'Something to add' }));
    });

    test('response transformer', async () => {
        const response = await mockService.get({ id: 7 }, {
            responseTransformers: [
                data => {
                    data.items = data.items.map(item => ({ text: item }));
                    return data;
                },
            ],
        });
        expect(response).toEqual(expect.objectContaining({
            id: 1,
            items: [{ text: 'Lorem Ipsum' }],
        }));
        expect(response).not.toBe(expect.objectContaining({
            id: 1,
            items: ['Lorem Ipsum'],
        }));
    });
});
