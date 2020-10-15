import * as services from '../../services';

describe('index', () => {
    test('index should export all the services available in the app', async () => {
        [
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
        ].forEach(service => expect(service in services).toEqual(true));
    });
});
