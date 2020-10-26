import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default [
    {
        path: '/dashboard',
        title: 'Dashboard',
        Icon: DashboardIcon,
    },
    {
        path: '/users',
        title: 'Users',
        Icon: PersonIcon,
        authorization: 'read-user',
    },
    {
        path: '/student-classes',
        title: 'Student Classes',
        Icon: PeopleIcon,
        authorization: 'read-student-class',
    },
    {
        name: 'test',
        title: 'Test',
        Icon: ReceiptIcon,
        items: [
            {
                path: '/tests/',
                title: 'Instances',
                authorization: 'read-test',
            },
            {
                path: '/test-assignations/',
                title: 'Assignations',
            },
            {
                path: '/test-sessions/',
                title: 'Sessions',
                authorization: 'read-test-session',
            },
            {
                name: 'types',
                title: 'Types',
                items: [
                    {
                        path: '/vocabularies',
                        title: 'Vocabularies',
                        authorization: 'read-vocabulary',
                    },
                    {
                        path: '/reading-comprehensions',
                        title: 'Reading Comprehensions',
                        authorization: 'read-reading-comprehension',
                    },
                    {
                        path: '/clozes',
                        title: 'Clozes',
                        authorization: 'read-cloze',
                    },
                    {
                        path: '/writings',
                        title: 'Writings',
                        authorization: 'read-writing',
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
                authorization: 'read-test-category',
            },
            {
                path: '/demographic-questionnaire-fields/',
                title: 'Demographic Fields',
                authorization: 'read-demographic-questionnaire-field',
            },
            {
                path: '/user-field-types/',
                title: 'User Field Types',
                authorization: 'read-user-field-type',
            },
            {
                path: '/enumerations/',
                title: 'Enumerations',
                authorization: 'read-enumeration',
            },
            {
                path: '/roles/',
                title: 'Roles',
                authorization: 'read-role',
            },
        ],
    },
];
