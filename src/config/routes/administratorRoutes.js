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

export default [
    {
        path: '/admin/vocabularies',
        component: Vocabularies,
        authorization: 'read-vocabulary',
    },
    {
        path: '/admin/vocabularies/vocabulary',
        component: Vocabulary,
        authorization: 'create-vocabulary',
    },
    {
        path: '/admin/vocabularies/vocabulary/:id',
        component: Vocabulary,
        authorization: 'read-vocabulary',
    },
    {
        path: '/admin/reading-comprehensions',
        component: ReadingComprehensions,
        authorization: 'read-reading-comprehension',
    },
    {
        path: '/admin/reading-comprehensions/reading-comprehension',
        component: ReadingComprehension,
        authorization: 'create-reading-comprehension',
    },
    {
        path: '/admin/reading-comprehensions/reading-comprehension/:id',
        component: ReadingComprehension,
        authorization: 'read-reading-comprehension',
    },
    {
        path: '/admin/clozes',
        component: Clozes,
        authorization: 'read-cloze',
    },
    {
        path: '/admin/clozes/cloze',
        component: Cloze,
        authorization: 'create-cloze',
    },
    {
        path: '/admin/clozes/cloze/:id',
        component: Cloze,
        authorization: 'read-cloze',
    },
    {
        path: '/admin/tests/',
        component: Tests,
        authorization: 'read-test',
    },
    {
        path: '/admin/tests/test',
        component: Test,
        authorization: 'create-test',
    },
    {
        path: '/admin/tests/test/:id',
        component: Test,
        authorization: 'read-test',
    },
    {
        path: '/admin/users',
        component: Users,
        authorization: 'read-user',
    },
    {
        path: '/admin/users/user',
        component: User,
        authorization: 'create-user',
    },
    {
        path: '/admin/users/user/:id',
        component: User,
        authorization: 'read-user',
    },
    {
        path: '/admin/test-sessions/',
        component: TestSessions,
        authorization: 'read-test-session',
    },
    {
        path: '/admin/test-sessions/test-session/:id',
        component: TestSession,
        authorization: 'read-test-session',
    },
    {
        path: '/admin/test-categories/',
        component: TestCategories,
        authorization: 'read-test-category',
    },
    {
        path: '/admin/test-categories/test-category',
        component: TestCategory,
        authorization: 'create-test-category',
    },
    {
        path: '/admin/test-categories/test-category/:id',
        component: TestCategory,
        authorization: 'read-test-category',
    },
    {
        path: '/admin/demographic-questionnaire-fields/',
        component: DemographicQuestionnaireFields,
        authorization: 'read-demographic-questionnaire-field',
    },
    {
        path: '/admin/demographic-questionnaire-fields/demographic-questionnaire-field',
        component: DemographicQuestionnaireField,
        authorization: 'create-demographic-questionnaire-field',
    },
    {
        path: '/admin/demographic-questionnaire-fields/demographic-questionnaire-field/:id',
        component: DemographicQuestionnaireField,
        authorization: 'read-demographic-questionnaire-field',
    },
    {
        path: '/admin/student-classes',
        component: StudentClasses,
        authorization: 'read-student-class',
    },
    {
        path: '/admin/student-classes/student-class',
        component: StudentClass,
        authorization: 'create-student-class',
    },
    {
        path: '/admin/student-classes/student-class/:id',
        component: StudentClass,
        authorization: 'read-student-class',
    },
    {
        path: '/admin/test-assignations',
        component: TestAssignations,
    },
    {
        path: '/admin/test-assignations/test-assignation',
        component: TestAssignation,
    },
    {
        path: '/admin/test-assignations/test-assignation/:id',
        component: TestAssignation,
    },
    {
        path: '/admin/writings',
        component: Writings,
        authorization: 'read-writing',
    },
    {
        path: '/admin/writings/writing',
        component: Writing,
        authorization: 'create-writing',
    },
    {
        path: '/admin/writings/writing/:id',
        component: Writing,
        authorization: 'read-writing',
    },
    {
        path: '/admin/enumerations/',
        component: Enumerations,
        authorization: 'read-enumeration',
    },
    {
        path: '/admin/enumerations/enumeration',
        component: Enumeration,
        authorization: 'create-enumeration',
    },
    {
        path: '/admin/enumerations/enumeration/:id',
        component: Enumeration,
        authorization: 'read-enumeration',
    },
    {
        path: '/admin/user-field-types/',
        component: UserFieldTypes,
        authorization: 'read-user-field-type',
    },
    {
        path: '/admin/user-field-types/user-field-type',
        component: UserFieldType,
        authorization: 'create-user-field-type',
    },
    {
        path: '/admin/user-field-types/user-field-type/:id',
        component: UserFieldType,
        authorization: 'read-user-field-type',
    },
    {
        path: '/admin/roles/',
        component: Roles,
        authorization: 'read-role',
    },
    {
        path: '/admin/roles/role',
        component: Role,
        authorization: 'create-role',
    },
    {
        path: '/admin/roles/role/:id',
        component: Role,
        authorization: 'read-role',
    },
    {
        path: '/admin/*',
        component: NotFound,
    },
];
