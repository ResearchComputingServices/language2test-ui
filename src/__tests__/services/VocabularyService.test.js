import axios from 'axios';
import _ from 'lodash';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/VocabularyService';
import constants from '../../constants';

describe('VocabularyService', () => {
    const route = `${constants.API_PREFIX_URL}/vocabulary`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            correct: 4,
            difficulty: '10',
            id: 1,
            immutable: false,
            options: [
                {
                    id: 21,
                    text: 'clammy',
                    vocabulary: 6,
                    vocabulary_id: 6,
                },
                {
                    id: 22,
                    text: 'active',
                    vocabulary: 6,
                    vocabulary_id: 6,
                },
            ],
            test_category: {
                id: 1,
                name: 'Default',
                test_type: {
                    id: 1,
                    name: 'Vocabulary',
                },
                test_type_id: 1,
            },
            test_category_id: 1,
            time_limit: 20,
            type: 'synonym',
            unremovable: true,
            word: 'emaciated',
        },
        {
            correct: 2,
            difficulty: '10',
            id: 2,
            immutable: false,
            options: [
                {
                    id: 25,
                    text: 'fight',
                    vocabulary: 7,
                    vocabulary_id: 7,
                },
                {
                    id: 26,
                    text: 'tempt',
                    vocabulary: 7,
                    vocabulary_id: 7,
                },
            ],
            test_category: {
                id: 1,
                name: 'Default',
                test_type: {
                    id: 1,
                    name: 'Vocabulary',
                },
                test_type_id: 1,
            },
            test_category_id: 1,
            time_limit: 20,
            type: 'synonym',
            unremovable: true,
            word: 'entice',
        },
    ];
    beforeAll(() => {
        mock.onGet(route).reply(200, _.cloneDeep(data));
        mock.onGet(`${route}?id=1`).reply(200, _.cloneDeep(data[0]));
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
        expect(response).toEqual(expect.objectContaining([
            {
                correct: 4,
                difficulty: '10',
                id: 1,
                immutable: false,
                options: [
                    'clammy',
                    'active',
                ],
                test_category: {
                    id: 1,
                    name: 'Default',
                    test_type: {
                        id: 1,
                        name: 'Vocabulary',
                    },
                    test_type_id: 1,
                },
                test_category_id: 1,
                time_limit: 20,
                type: 'synonym',
                unremovable: true,
                word: 'emaciated',
            },
            {
                correct: 2,
                difficulty: '10',
                id: 2,
                immutable: false,
                options: [
                    'fight',
                    'tempt',
                ],
                test_category: {
                    id: 1,
                    name: 'Default',
                    test_type: {
                        id: 1,
                        name: 'Vocabulary',
                    },
                    test_type_id: 1,
                },
                test_category_id: 1,
                time_limit: 20,
                type: 'synonym',
                unremovable: true,
                word: 'entice',
            },
        ]));
    });

    test('get an item', async () => {
        const response = await service.get({ id: 1 });
        expect(response).toEqual(expect.objectContaining({
            correct: 4,
            difficulty: '10',
            id: 1,
            immutable: false,
            options: [
                'clammy',
                'active',
            ],
            test_category: {
                id: 1,
                name: 'Default',
                test_type: {
                    id: 1,
                    name: 'Vocabulary',
                },
                test_type_id: 1,
            },
            test_category_id: 1,
            time_limit: 20,
            type: 'synonym',
            unremovable: true,
            word: 'emaciated',
        }));
    });

    test('add', async () => {
        const request = _.cloneDeep(data[1]);
        const response = await service.add(request);
        expect(response).toEqual(expect.objectContaining({
            correct: 2,
            difficulty: '10',
            id: 2,
            immutable: false,
            options: [
                {
                    id: 25,
                    text: 'fight',
                    vocabulary: 7,
                    vocabulary_id: 7,
                },
                {
                    id: 26,
                    text: 'tempt',
                    vocabulary: 7,
                    vocabulary_id: 7,
                },
            ],
            test_category: {
                id: 1,
                name: 'Default',
                test_type: {
                    id: 1,
                    name: 'Vocabulary',
                },
                test_type_id: 1,
            },
            test_category_id: 1,
            time_limit: 20,
            type: 'synonym',
            unremovable: true,
            word: 'entice',
        }));
    });

    test('update', async () => {
        const request = _.cloneDeep(data[1]);
        const response = await service.update(request);
        expect(response).toEqual(expect.objectContaining({
            correct: 2,
            difficulty: '10',
            id: 2,
            immutable: false,
            options: [
                {
                    id: 25,
                    text: 'fight',
                    vocabulary: 7,
                    vocabulary_id: 7,
                },
                {
                    id: 26,
                    text: 'tempt',
                    vocabulary: 7,
                    vocabulary_id: 7,
                },
            ],
            test_category: {
                id: 1,
                name: 'Default',
                test_type: {
                    id: 1,
                    name: 'Vocabulary',
                },
                test_type_id: 1,
            },
            test_category_id: 1,
            time_limit: 20,
            type: 'synonym',
            unremovable: true,
            word: 'entice',
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
