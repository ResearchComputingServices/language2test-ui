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
                title: 'Development',
                roles: ['Administrator', 'Instructor', 'Test Developer'],
            },
            {
                path: '/test-assignations/',
                title: 'Scheduling',
                roles: 'Administrator',
            },
            {
                path: '/test-sessions/',
                title: 'Past Results',
                roles: ['Instructor', 'Administrator', 'Test Developer'],
            },
            {
                name: 'types',
                title: 'Item banks',
                items: [
                    {
                        path: '/vocabularies',
                        title: 'Vocabulary',
                        roles: ['Administrator', 'Instructor', 'Test Developer'],
                    },
                    {
                        path: '/reading-comprehensions',
                        title: 'Reading',
                        roles: ['Administrator', 'Instructor', 'Test Developer'],
                    },
                    {
                        path: '/clozes',
                        title: 'Cloze',
                        roles: ['Administrator', 'Instructor', 'Test Developer'],
                    },
                    {
                        path: '/writings',
                        title: 'Writing',
                        roles: ['Administrator', 'Instructor', 'Test Developer'],
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
                roles: ['Administrator', 'Test Developer'],
            },
            {
                path: '/demographic-questionnaire-fields/',
                title: 'Demographic Fields',
                roles: ['Administrator', 'Test Developer'],
            },
            {
                path: '/user-field-types/',
                title: 'User Field Types',
                roles: ['Administrator', 'Test Developer'],
            },
            {
                path: '/enumerations/',
                title: 'Enumerations',
                roles: ['Administrator', 'Test Developer'],
            },
            {
                path: '/roles/',
                title: 'Roles',
                roles: 'Administrator',
            },
        ],
    },
];
