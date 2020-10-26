import { DrawerAssemblerService as Service } from '../../services/DrawerAssemblerService';

describe('DrawerAssemblerService', () => {
    let service;
    let config;

    beforeAll(() => {
        service = new Service([
            { name: 'create_a' },
            { name: 'create_b' },
            { name: 'create_c' },
            { name: 'create_d' },
            { name: 'create_e' },
            { name: 'create_f' },
            { name: 'create_j' },
            { name: 'create_k' },
        ]);
        config = [
            {
                path: 'A',
                role: 'create_a',
            },
            {
                path: 'B',
                role: 'create_b',
            },
            {
                items: [
                    {
                        path: 'C',
                        role: 'create_c',
                    },
                    {
                        path: 'D',
                        role: 'create_d',
                    },
                    {
                        path: 'E',
                        role: 'create_e',
                    },
                    {
                        items: [
                            {
                                path: 'F',
                                role: 'create_f',
                            },
                            {
                                path: 'G',
                                role: 'create_g',
                            },
                            {
                                path: 'H',
                                role: 'create_h',
                            },
                            {
                                items: [
                                    {
                                        path: 'I',
                                        role: 'create_i',
                                    },
                                    {
                                        path: 'J',
                                        role: 'create_j',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'K',
                        role: 'create_k',
                    },
                ],
            },
        ];
    });

    test('isItemAuthorized', () => {
        expect(service.isItemAuthorized({ role: 'create_a' })).toEqual(true);
        expect(service.isItemAuthorized({ role: 'read_a' })).toEqual(false);
        expect(service.isItemAuthorized({
            roles: ['create_a', 'read_a'],
            operator: 'or',
        })).toEqual(true);
        expect(service.isItemAuthorized({
            roles: ['create_a', 'read_a'],
            operator: 'and',
        })).toEqual(false);
    });

    test('flattenItems', () => {
        expect(service.flattenItems(config)).toEqual(expect.arrayContaining([
            {
                path: 'A',
                role: 'create_a',
            },
            {
                path: 'B',
                role: 'create_b',
            },
            {
                path: 'C',
                role: 'create_c',
            },
            {
                path: 'D',
                role: 'create_d',
            },
            {
                path: 'E',
                role: 'create_e',
            },
            {
                path: 'F',
                role: 'create_f',
            },
            {
                path: 'J',
                role: 'create_j',
            },
            {
                path: 'K',
                role: 'create_k',
            },
        ]));
    });

    test('assembleItems', () => {
        expect(service.assembleItems(config)).toEqual(expect.arrayContaining([
            {
                path: 'A',
                role: 'create_a',
            },
            {
                path: 'B',
                role: 'create_b',
            },
            {
                items: [
                    {
                        path: 'C',
                        role: 'create_c',
                    },
                    {
                        path: 'D',
                        role: 'create_d',
                    },
                    {
                        path: 'E',
                        role: 'create_e',
                    },
                    {
                        items: [
                            {
                                path: 'F',
                                role: 'create_f',
                            },
                            {
                                items: [
                                    {
                                        path: 'J',
                                        role: 'create_j',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'K',
                        role: 'create_k',
                    },
                ],
            },
        ]));
    });
});
