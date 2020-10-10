import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import service from '../../services/ClozeService';
import constants from '../../constants';

describe('ClozeService', () => {
    const route = `${constants.API_PREFIX_URL}/cloze`;
    const mock = new MockAdapter(axios);
    const data = [
        {
            filename: '',
            id: 1,
            immutable: false,
            name: 'Cloze-1',
            questions: [
                {
                    accepted_answers: [],
                    cloze_id: 1,
                    correct: 3,
                    difficulty: 1,
                    id: 1,
                    options: [
                        {
                            cloze_question_id: 1,
                            id: 1,
                            text: 'if',
                        },
                        {
                            cloze_question_id: 1,
                            id: 2,
                            text: 'where',
                        },
                        {
                            cloze_question_id: 1,
                            id: 3,
                            text: 'that',
                        },
                        {
                            cloze_question_id: 1,
                            id: 4,
                            text: 'whether',
                        },
                        {
                            cloze_question_id: 1,
                            id: 5,
                            text: 'when',
                        },
                    ],
                    text: 'that',
                    typed: null,
                },
                {
                    accepted_answers: [],
                    cloze_id: 1,
                    correct: 4,
                    difficulty: 1,
                    id: 2,
                    options: [
                        {
                            cloze_question_id: 2,
                            id: 6,
                            text: 'being disappeared',
                        },
                        {
                            cloze_question_id: 2,
                            id: 7,
                            text: 'to be disappeared',
                        },
                        {
                            cloze_question_id: 2,
                            id: 8,
                            text: 'to have disappeared',
                        },
                        {
                            cloze_question_id: 2,
                            id: 9,
                            text: 'to disappear',
                        },
                        {
                            cloze_question_id: 2,
                            id: 10,
                            text: 'having disappeared',
                        },
                    ],
                    text: 'to disappear',
                    typed: null,
                },
                {
                    accepted_answers: [],
                    cloze_id: 1,
                    correct: 1,
                    difficulty: 1,
                    id: 3,
                    options: [
                        {
                            cloze_question_id: 3,
                            id: 11,
                            text: 'until',
                        },
                        {
                            cloze_question_id: 3,
                            id: 12,
                            text: 'since',
                        },
                        {
                            cloze_question_id: 3,
                            id: 13,
                            text: 'after',
                        },
                        {
                            cloze_question_id: 3,
                            id: 14,
                            text: 'by the time',
                        },
                        {
                            cloze_question_id: 3,
                            id: 15,
                            text: 'unless',
                        },
                    ],
                    text: 'until',
                    typed: null,
                },
                {
                    accepted_answers: [],
                    cloze_id: 1,
                    correct: 3,
                    difficulty: 1,
                    id: 4,
                    options: [
                        {
                            cloze_question_id: 4,
                            id: 16,
                            text: 'reluctantly',
                        },
                        {
                            cloze_question_id: 4,
                            id: 17,
                            text: 'accidentally',
                        },
                        {
                            cloze_question_id: 4,
                            id: 18,
                            text: 'slowly',
                        },
                        {
                            cloze_question_id: 4,
                            id: 19,
                            text: 'passionately',
                        },
                        {
                            cloze_question_id: 4,
                            id: 20,
                            text: 'carefully',
                        },
                    ],
                    text: 'slowly',
                    typed: null,
                },
                {
                    accepted_answers: [],
                    cloze_id: 1,
                    correct: 3,
                    difficulty: 1,
                    id: 5,
                    options: [
                        {
                            cloze_question_id: 5,
                            id: 21,
                            text: 'the same',
                        },
                        {
                            cloze_question_id: 5,
                            id: 22,
                            text: 'alike',
                        },
                        {
                            cloze_question_id: 5,
                            id: 23,
                            text: 'just as',
                        },
                        {
                            cloze_question_id: 5,
                            id: 24,
                            text: 'by the way',
                        },
                        {
                            cloze_question_id: 5,
                            id: 25,
                            text: 'similar to',
                        },
                    ],
                    text: 'just as',
                    typed: null,
                },
            ],
            test_category: {
                id: 3,
                name: 'Default',
                test_type: {
                    id: 3,
                    name: 'Cloze',
                },
                test_type_id: 3,
            },
            test_category_id: 3,
            // eslint-disable-next-line no-multi-str
            text: 'Can we see *that<if, where, whether, \
                when>* the earth is a globe? Yes, we can, when we watch a ship \
                that sails out to sea. If we watch closely, we see that the ship \
                begins *to disappear<being disappeared, to be disappeared, to have \
                disappeared, having disappeared>* . The bottom of the ship disappears \
                first, and then the ship seems to sink lower and lower, *until<since, \
                after, by the time, unless>* we can only see the top of the ship, and \
                then we see nothing at all. What is hiding the ship from us? It is the earth. \
                Stick a pin most of the way into an orange, and *slowly<reluctantly, accidentally, \
                slowly, passionately, carefully>* turn the orange away from you. You will see the pin \
                disappear, *similar to<the same, alike, by the way, similar>* a ship does on the earth.',
            time_limit: 600,
            type: 'text',
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
        const response = await service.add({
            questions: [
                { options: ['1', '2', '3'] },
                { acceptedAnswers: ['1', '2', '3'] },
            ],
        });
        expect(response).toEqual(expect.objectContaining({
            questions: [
                { options: [{ text: '1' }, { text: '2' }, { text: '3' }], acceptedAnswers: [] },
                { acceptedAnswers: [{ text: '1' }, { text: '2' }, { text: '3' }], options: [] },
            ],
        }));
    });

    test('update', async () => {
        const response = await service.update({
            questions: [
                { options: ['1', '2', '3'] },
                { acceptedAnswers: ['1', '2', '3'] },
            ],
        });
        expect(response).toEqual(expect.objectContaining({
            questions: [
                { options: [{ text: '1' }, { text: '2' }, { text: '3' }], acceptedAnswers: [] },
                { acceptedAnswers: [{ text: '1' }, { text: '2' }, { text: '3' }], options: [] },
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
