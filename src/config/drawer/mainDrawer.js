import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export default [
    {
        path: '/dashboard/test-taker',
        title: 'Dashboard',
        roles: 'Test Taker',
        Icon: DashboardIcon,
    },
    {
        path: '/dashboard/instructor',
        title: 'Dashboard',
        roles: 'Instructor',
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
                title: 'Dashboards',
                Icon: DashboardIcon,
                items: [
                    {
                        path: '/dashboard/test-taker',
                        title: 'Test Taker Dashboard',
                        roles: 'Administrator',
                        Icon: AssignmentIndIcon,
                    },
                    {
                        path: '/dashboard/instructor',
                        title: 'Instructor Dashboard',
                        roles: 'Administrator',
                        Icon: AssignmentTurnedInIcon,
                    },
                ],
            },
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
