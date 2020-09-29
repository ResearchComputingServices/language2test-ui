import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

export default [
    {
        path: '/admin/users',
        title: 'Users',
        Icon: PersonIcon,
        authorization: 'read-user',
    },
    {
        path: '/admin/student-classes',
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
                path: '/admin/tests/',
                title: 'Instances',
                authorization: 'read-test',
            },
            {
                path: '/admin/test-sessions/',
                title: 'Sessions',
                authorization: 'read-test-session',
            },
            {
                name: 'types',
                title: 'Types',
                items: [
                    {
                        path: '/admin/vocabularies',
                        title: 'Vocabularies',
                        authorization: 'read-vocabulary',
                    },
                    {
                        path: '/admin/reading-comprehensions',
                        title: 'Reading Comprehensions',
                        authorization: 'read-reading-comprehension',
                    },
                    {
                        path: '/admin/clozes',
                        title: 'Clozes',
                        authorization: 'read-cloze',
                    },
                    {
                        path: '/admin/writings',
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
                path: '/admin/test-categories/',
                title: 'Test Categories',
                authorization: 'read-test-category',
            },
            {
                path: '/admin/demographic-questionnaire-fields/',
                title: 'Demographic Fields',
                authorization: 'read-demographic-questionnaire-field',
            },
            {
                path: '/admin/user-field-types/',
                title: 'User Field Types',
                authorization: 'read-user-field-type',
            },
            {
                path: '/admin/enumerations/',
                title: 'Enumerations',
                authorization: 'read-enumeration',
            },
            {
                path: '/admin/roles/',
                title: 'Roles',
                authorization: 'read-role',
            },
        ],
    },
];
