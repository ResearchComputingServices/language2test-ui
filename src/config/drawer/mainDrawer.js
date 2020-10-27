import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default [
    {
        path: '/dashboard/test-taker',
        title: 'Test Taker Dashboard',
        Icon: DashboardIcon,
    },
    {
        path: '/dashboard/teacher',
        title: 'Teacher Dashboard',
        Icon: DashboardIcon,
    },
    {
        path: '/users',
        title: 'Users',
        Icon: PersonIcon,
        role: 'Administrator',
    },
    {
        path: '/student-classes',
        title: 'Student Classes',
        Icon: PeopleIcon,
        role: 'Administrator',
    },
    {
        name: 'test',
        title: 'Test',
        Icon: ReceiptIcon,
        items: [
            {
                path: '/tests/',
                title: 'Instances',
                role: 'Administrator',
            },
            {
                path: '/test-assignations/',
                title: 'Assignations',
            },
            {
                path: '/test-sessions/',
                title: 'Sessions',
                role: 'Administrator',
            },
            {
                name: 'types',
                title: 'Types',
                items: [
                    {
                        path: '/vocabularies',
                        title: 'Vocabularies',
                        role: 'Administrator',
                    },
                    {
                        path: '/reading-comprehensions',
                        title: 'Reading Comprehensions',
                        role: 'Administrator',
                    },
                    {
                        path: '/clozes',
                        title: 'Clozes',
                        role: 'Administrator',
                    },
                    {
                        path: '/writings',
                        title: 'Writings',
                        role: 'Administrator',
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
                role: 'Administrator',
            },
            {
                path: '/demographic-questionnaire-fields/',
                title: 'Demographic Fields',
                role: 'Administrator',
            },
            {
                path: '/user-field-types/',
                title: 'User Field Types',
                role: 'Administrator',
            },
            {
                path: '/enumerations/',
                title: 'Enumerations',
                role: 'Administrator',
            },
            {
                path: '/roles/',
                title: 'Roles',
                role: 'Administrator',
            },
        ],
    },
];
