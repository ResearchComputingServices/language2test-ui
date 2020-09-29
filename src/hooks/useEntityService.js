import useService from './useService';

// TODO why do we have so many definitions in so many different places
export default function useEntityService(entity) {
    const entityServiceMap = {
        user: {
            service: useService('user'),
            identifierKey: 'name',
        },
        student: {
            service: useService('student'),
            identifierKey: 'name',
        },
        test: {
            service: useService('test'),
            identifierKey: 'name',
        },
        roles: {
            service: useService('roles'),
            identifierKey: 'name',
        },
        testCategory: {
            service: useService('testCategory'),
            identifierKey: 'name',
        },
        testType: {
            service: useService('testType'),
            identifierKey: 'name',
        },
        userFieldType: {
            service: useService('userFieldType'),
            identifierKey: 'name',
        },
        demographicQuestionnaireField: {
            service: useService('demographicQuestionnaireField'),
            identifierKey: 'display',
        },
        studentClass: {
            service: useService('studentClass'),
            identifierKey: 'display',
        },
        enumeration: {
            service: useService('enumeration'),
            identifierKey: 'name',
        },
    };
    return entityServiceMap[entity];
}
