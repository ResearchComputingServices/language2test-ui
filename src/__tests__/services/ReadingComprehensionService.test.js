import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/ReadingComprehensionService';
import constants from '../../constants';

describe('ReadingComprehensionService', () => {
    const route = `${constants.API_PREFIX_URL}/rc`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            filename: '',
            id: 1,
            immutable: false,
            name: 'RC-1',
            questions: [
                {
                    correct: 1,
                    difficulty: 1,
                    id: 11,
                    options: [
                        {
                            id: 41,
                            rc_question: 11,
                            rc_question_id: 11,
                            text: 'inquisitive',
                        },
                    ],
                    rc: 1,
                    rc_id: 1,
                    text: 'The word "supplanted" in paragraph 1',
                },
            ],
            test_category: {
                id: 2,
                name: 'Default',
                test_type: {
                    id: 2,
                    name: 'Reading Comprehension',
                },
                test_type_id: 2,
            },
            test_category_id: 2,
            text: 'Lorem Ipsum',
            time_limit: 600,
            type: null,
            unremovable: true,
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
        const request = data[0];
        const response = await service.add(request);
        expect(response).toEqual(expect.objectContaining({
            filename: '',
            id: 1,
            immutable: false,
            name: 'RC-1',
            questions: [
                {
                    correct: 1,
                    difficulty: 1,
                    id: 11,
                    options: [
                        { id: 41, rc_question: 11, rc_question_id: 11, text: 'inquisitive' },
                    ],
                    rc: 'RC-1',
                    rc_id: 1,
                    text: 'The word "supplanted" in paragraph 1',
                    rcName: 'RC-1',
                },
            ],
            test_category: {
                id: 2,
                name: 'Default',
                test_type: { id: 2, name: 'Reading Comprehension' },
                test_type_id: 2,
            },
            test_category_id: 2,
            text: 'Lorem Ipsum',
            time_limit: 600,
            type: null,
            unremovable: true,
        }));
    });

    test('update', async () => {
        const request = data[0];
        const response = await service.update(request);
        expect(response).toEqual(expect.objectContaining({
            filename: '',
            id: 1,
            immutable: false,
            name: 'RC-1',
            questions: [
                {
                    correct: 1,
                    difficulty: 1,
                    id: 11,
                    options: [
                        { id: 41, rc_question: 11, rc_question_id: 11, text: 'inquisitive' },
                    ],
                    rc: 'RC-1',
                    rc_id: 1,
                    text: 'The word "supplanted" in paragraph 1',
                    rcName: 'RC-1',
                },
            ],
            test_category: {
                id: 2,
                name: 'Default',
                test_type: { id: 2, name: 'Reading Comprehension' },
                test_type_id: 2,
            },
            test_category_id: 2,
            text: 'Lorem Ipsum',
            time_limit: 600,
            type: null,
            unremovable: true,
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
