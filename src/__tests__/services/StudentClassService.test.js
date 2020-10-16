import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/StudentClassService';
import constants from '../../constants';

describe('StudentClassService', () => {
    const route = `${constants.API_PREFIX_URL}/student_classes`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            display: 'Level 1 - Class 2 - Winter',
            id: 6,
            instructor: {
                first_name: 'Tanvir',
                id: 2,
                last_name: 'Islam',
                name: 'tanvirislam',
            },
            instructor_id: '2',
            name: 'level_1_class_2_winter',
            student_student_class: [],
        },
        {
            display: 'Level 1 - Class 1 - Summer',
            id: 6,
            instructor: {
                first_name: 'Tanvir',
                id: 2,
                last_name: 'Islam',
                name: 'tanvirislam',
            },
            instructor_id: '2',
            name: 'level_1_class_2_summer',
            student_student_class: [],
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
            display: 'Level 1 - Class 1 - Summer',
            id: 6,
            instructor: {
                first_name: 'Tanvir',
                id: 2,
                last_name: 'Islam',
                name: 'tanvirislam',
            },
            instructor_id: '2',
            name: 'level_1_class_2_summer',
            student_student_class: [],
        }));
    });

    test('update', async () => {
        const request = data[1];
        const response = await service.update(request);
        expect(response).toEqual(expect.objectContaining({
            display: 'Level 1 - Class 1 - Summer',
            id: 6,
            instructor: {
                first_name: 'Tanvir',
                id: 2,
                last_name: 'Islam',
                name: 'tanvirislam',
            },
            instructor_id: '2',
            name: 'level_1_class_2_summer',
            student_student_class: [],
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
