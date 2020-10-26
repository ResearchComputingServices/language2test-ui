import Administrator from '../../components/administrator';
import StudentDashboard from '../../components/studentDashboard';
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
                return StudentDashboard;
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
        path: '/student/dashboard',
        component: StudentDashboard,
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
