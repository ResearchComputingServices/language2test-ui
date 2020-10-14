import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/FileService';
import constants from '../../constants';

describe('FileService', () => {
    const route = `${constants.API_PREFIX_URL}/images`;
    const mock = new MockAdapter(axios);
    const fileName = 'example.jpeg';
    const content = ['content'];

    beforeAll(() => {
        mock.onPost(`${route}`).reply(config => [200, {
            data: {
                name: config.data.get('name'),
                file: config.data.get('file'),
            },
            responseType: config.responseType,
            headers: config.headers,
        }]);
        mock.onGet(`${route}?name=${fileName}`).reply(config => [200, { responseType: config.responseType }]);
    });

    test('prefix', () => expect(service.getUrl()).toBe(route));

    test('upload', async () => {
        const response = (await service.upload(content, fileName)).data;
        expect(response.headers).toEqual(expect.objectContaining({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'multipart/form-data',
        }));
        expect(response.data).toEqual(expect.objectContaining({
            file: 'content',
            name: 'example.jpeg',
        }));
    });

    test('download', async () => {
        const response = (await service.download(fileName)).data;
        expect(response).toEqual(expect.objectContaining({ responseType: 'blob' }));
    });
});
