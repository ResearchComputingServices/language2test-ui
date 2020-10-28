import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default [
    {
        path: '/dashboard',
        title: 'Dashboard',
        roles: '*',
        Icon: DashboardIcon,
    },
    {
        path: '/users',
        title: 'Users',
        Icon: PersonIcon,
        roles: 'Administrator',
    },
    {
        path: '/student-classes',
        title: 'Student Classes',
        Icon: PeopleIcon,
        roles: 'Administrator',
    },
    {
        name: 'test',
        title: 'Test',
        Icon: ReceiptIcon,
        items: [
            {
                path: '/tests/',
                title: 'Instances',
                roles: ['Administrator', 'Instructor', 'Test Developer'],
            },
            {
                path: '/test-assignations/',
                title: 'Assignations',
                roles: 'Administrator',
            },
            {
                path: '/test-sessions/',
                title: 'Sessions',
                roles: 'Administrator',
            },
            {
                name: 'types',
                title: 'Types',
                items: [
                    {
                        path: '/vocabularies',
                        title: 'Vocabularies',
                        roles: ['Administrator', 'Instructor'],
                    },
                    {
                        path: '/reading-comprehensions',
                        title: 'Reading Comprehensions',
                        roles: ['Administrator', 'Instructor'],
                    },
                    {
                        path: '/clozes',
                        title: 'Clozes',
                        roles: ['Administrator', 'Instructor'],
                    },
                    {
                        path: '/writings',
                        title: 'Writings',
                        roles: ['Administrator', 'Instructor'],
                    },
                ],
            },
        ],
    },
    'divider',
    {
        name: 'settings',
        title: 'Settings',
        Icon: SettingsIcon,
        items: [
            {
                path: '/test-categories/',
                title: 'Test Categories',
                roles: 'Administrator',
            },
            {
                path: '/demographic-questionnaire-fields/',
                title: 'Demographic Fields',
                roles: 'Administrator',
            },
            {
                path: '/user-field-types/',
                title: 'User Field Types',
                roles: 'Administrator',
            },
            {
                path: '/enumerations/',
                title: 'Enumerations',
                roles: 'Administrator',
            },
            {
                path: '/roles/',
                title: 'Roles',
                roles: 'Administrator',
            },
        ],
    },
];
