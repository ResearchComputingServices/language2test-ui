import _ from 'lodash';
import * as services from '../../services';

describe('index', () => {
    test('index should export all the services available in the app', async () => {
        const serviceSet = new Set([
            'history',
            'interceptor',
            'keycloak',
            'readingComprehension',
            'test',
            'testSession',
            'user',
            'vocabulary',
            'role',
            'file',
            'cloze',
            'testCategory',
            'testType',
            'demographicQuestionnaireField',
            'userFieldType',
            'writing',
            'enumeration',
            'authorizationChecker',
            'routesAssembler',
            'drawerAssembler',
            'authorization',
            'studentClass',
            'testAssignation',
            'testSchedule',
        ]);
        _.each(services, (value, service) => {
            expect(serviceSet.has(service)).toEqual(true);
        });
    });
});
