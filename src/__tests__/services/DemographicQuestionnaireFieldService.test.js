import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/DemographicQuestionnaireFieldService';
import constants from '../../constants';

describe('DemographicQuestionnaireFieldService', () => {
    const route = `${constants.API_PREFIX_URL}/user_field_categories`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            display: 'Student Id',
            id: 1,
            name: 'student_id',
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'text',
            },
            user_field_type_id: 1,
        },
        {
            display: 'First Language',
            id: 2,
            name: 'first_language',
            user_field_type: {
                enumeration: {
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
                enumeration_id: 2,
                id: 10,
                name: 'Language',
            },
            user_field_type_id: 10,
        },
        {
            display: 'Email',
            id: 3,
            name: 'email',
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'text',
            },
            user_field_type_id: 1,
        },
        {
            display: 'Phone',
            id: 4,
            name: 'phone',
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'text',
            },
            user_field_type_id: 1,
        },
        {
            display: 'Address',
            id: 5,
            name: 'address',
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'text',
            },
            user_field_type_id: 1,
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
        const response = await service.add({
            display: 'Student Id',
            id: 1,
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'text',
            },
            user_field_type_id: 1,
        });
        expect(response).toEqual(expect.objectContaining({
            display: 'Student Id',
            name: 'student_id',
            id: 1,
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'text',
            },
            user_field_type_id: 1,
        }));
    });

    test('update', async () => {
        const response = await service.update({
            display: 'Student Id',
            name: 'student_id',
            id: 1,
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'something else',
            },
            user_field_type_id: 1,
        });
        expect(response).toEqual(expect.objectContaining({
            display: 'Student Id',
            name: 'student_id',
            id: 1,
            user_field_type: {
                enumeration: null,
                enumeration_id: null,
                id: 1,
                name: 'something else',
            },
            user_field_type_id: 1,
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
