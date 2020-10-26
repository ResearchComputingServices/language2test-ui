import Vocabularies from '../../components/vocabularies';
import Vocabulary from '../../components/vocabulary';
import Users from '../../components/users';
import User from '../../components/user';
import TestSessions from '../../components/testSessions';
import TestSession from '../../components/testSession';
import Tests from '../../components/tests';
import Test from '../../components/test';
import ReadingComprehensions from '../../components/readingComprehensions';
import ReadingComprehension from '../../components/readingComprehension';
import Clozes from '../../components/clozes';
import Cloze from '../../components/cloze';
import TestCategories from '../../components/testCategories';
import TestCategory from '../../components/testCategory';
import NotFound from '../../components/common/NotFound';
import DemographicQuestionnaireFields from '../../components/demographicQuestionnaireFields';
import DemographicQuestionnaireField from '../../components/demographicQuestionnaireField';
import StudentClasses from '../../components/studentClasses';
import StudentClass from '../../components/studentClass';
import Writings from '../../components/writings';
import Writing from '../../components/writing';
import Enumerations from '../../components/enumerations';
import Enumeration from '../../components/enumeration';
import UserFieldTypes from '../../components/userFieldTypes';
import UserFieldType from '../../components/userFieldType';
import Role from '../../components/role';
import Roles from '../../components/roles';
import TestAssignations from '../../components/testAssignations';
import TestAssignation from '../../components/testAssignation';
import AdministratorDashboard from '../../components/administratorDashboard';
import TestWizard from '../../components/testWizard';

export default [
    {
        path: '/test/wizard',
        component: TestWizard,
        role: 'Administrator',
    },
    {
        path: '/dashboard',
        component: AdministratorDashboard,
    },
    {
        path: '/vocabularies',
        component: Vocabularies,
        role: 'Administrator',
    },
    {
        path: '/vocabularies/vocabulary',
        component: Vocabulary,
        role: 'Administrator',
    },
    {
        path: '/vocabularies/vocabulary/:id',
        component: Vocabulary,
        role: 'Administrator',
    },
    {
        path: '/reading-comprehensions',
        component: ReadingComprehensions,
        role: 'Administrator',
    },
    {
        path: '/reading-comprehensions/reading-comprehension',
        component: ReadingComprehension,
        role: 'Administrator',
    },
    {
        path: '/reading-comprehensions/reading-comprehension/:id',
        component: ReadingComprehension,
        role: 'Administrator',
    },
    {
        path: '/clozes',
        component: Clozes,
        role: 'Administrator',
    },
    {
        path: '/clozes/cloze',
        component: Cloze,
        role: 'Administrator',
    },
    {
        path: '/clozes/cloze/:id',
        component: Cloze,
        role: 'Administrator',
    },
    {
        path: '/tests/',
        component: Tests,
        role: 'Administrator',
    },
    {
        path: '/tests/test',
        component: Test,
        role: 'Administrator',
    },
    {
        path: '/tests/test/:id',
        component: Test,
        role: 'Administrator',
    },
    {
        path: '/users',
        component: Users,
        role: 'Administrator',
    },
    {
        path: '/users/user',
        component: User,
        role: 'Administrator',
    },
    {
        path: '/users/user/:id',
        component: User,
        role: 'Administrator',
    },
    {
        path: '/test-sessions/',
        component: TestSessions,
        role: 'Administrator',
    },
    {
        path: '/test-sessions/test-session/:id',
        component: TestSession,
        role: 'Administrator',
    },
    {
        path: '/test-categories/',
        component: TestCategories,
        role: 'Administrator',
    },
    {
        path: '/test-categories/test-category',
        component: TestCategory,
        role: 'Administrator',
    },
    {
        path: '/test-categories/test-category/:id',
        component: TestCategory,
        role: 'Administrator',
    },
    {
        path: '/demographic-questionnaire-fields/',
        component: DemographicQuestionnaireFields,
        role: 'Administrator',
    },
    {
        path: '/demographic-questionnaire-fields/demographic-questionnaire-field',
        component: DemographicQuestionnaireField,
        role: 'Administrator',
    },
    {
        path: '/demographic-questionnaire-fields/demographic-questionnaire-field/:id',
        component: DemographicQuestionnaireField,
        role: 'Administrator',
    },
    {
        path: '/student-classes',
        component: StudentClasses,
        role: 'Administrator',
    },
    {
        path: '/student-classes/student-class',
        component: StudentClass,
        role: 'Administrator',
    },
    {
        path: '/student-classes/student-class/:id',
        component: StudentClass,
        role: 'Administrator',
    },
    {
        path: '/test-assignations',
        component: TestAssignations,
    },
    {
        path: '/test-assignations/test-assignation',
        component: TestAssignation,
    },
    {
        path: '/test-assignations/test-assignation/:id',
        component: TestAssignation,
    },
    {
        path: '/writings',
        component: Writings,
        role: 'Administrator',
    },
    {
        path: '/writings/writing',
        component: Writing,
        role: 'Administrator',
    },
    {
        path: '/writings/writing/:id',
        component: Writing,
        role: 'Administrator',
    },
    {
        path: '/enumerations/',
        component: Enumerations,
        role: 'Administrator',
    },
    {
        path: '/enumerations/enumeration',
        component: Enumeration,
        role: 'Administrator',
    },
    {
        path: '/enumerations/enumeration/:id',
        component: Enumeration,
        role: 'Administrator',
    },
    {
        path: '/user-field-types/',
        component: UserFieldTypes,
        role: 'Administrator',
    },
    {
        path: '/user-field-types/user-field-type',
        component: UserFieldType,
        role: 'Administrator',
    },
    {
        path: '/user-field-types/user-field-type/:id',
        component: UserFieldType,
        role: 'Administrator',
    },
    {
        path: '/roles/',
        component: Roles,
        role: 'Administrator',
    },
    {
        path: '/roles/role',
        component: Role,
        role: 'Administrator',
    },
    {
        path: '/roles/role/:id',
        component: Role,
        role: 'Administrator',
    },
    {
        path: '/*',
        component: NotFound,
    },
];
