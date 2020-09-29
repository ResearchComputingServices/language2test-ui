import Administrator from '../../components/administrator';
import TestWizardSession from '../../components/testWizardSession';
import TestWizard from '../../components/testWizard';
import NotFound from '../../components/common/NotFound';

export default [
    {
        path: '/',
        conditional: ({ authorizationCheckerService }) => {
            if (authorizationCheckerService.has('admin')) {
                return Administrator;
            }
            if (authorizationCheckerService.has('test')) {
                return TestWizardSession;
            }
            return NotFound;
        },
    },
    {
        path: ['/admin', '/admin/*'],
        component: Administrator,
        authorization: 'admin',
    },
    {
        path: '/test',
        component: TestWizardSession,
        authorization: 'test',
    },
    {
        path: '/test/wizard',
        component: TestWizard,
        authorization: 'test',
    },
    {
        path: '*',
        component: NotFound,
    },
];
