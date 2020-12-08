import React from 'react';
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
import Roles from '../../components/roles';
import TestAssignations from '../../components/testAssignations';
import TestAssignation from '../../components/testAssignation';
import Dashboard from '../../components/dashboard';
import TestWizard from '../../components/testWizard';
import InstructorSchedule from '../../components/instructorSchedule';
import InstructorStudentClass from '../../components/instructorStudentClass';
import Student from '../../components/student';
import InstructorTestAssignation from '../../components/instructorTestAssignation';
import InstructorTestSessions from '../../components/instructorTestSessions';
import TestTakerSchedule from '../../components/testTakerSchedule';
import TestDeveloperTestSessions from '../../components/testDeveloperTestSessions';

export default [
    {
        path: '/',
        component: Dashboard,
        roles: '*',
    },
    {
        path: '/dashboard',
        component: Dashboard,
        roles: '*',
    },
    {
        path: '/test/wizard',
        component: TestWizard,
        roles: ['Administrator', 'Test Taker'],
    },
    {
        path: '/vocabularies',
        component: Vocabularies,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/vocabularies/vocabulary',
        component: Vocabulary,
        roles: ['Administrator', 'Test Developer'],
    },
    {
        path: '/vocabularies/vocabulary/:id',
        component: Vocabulary,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/reading-comprehensions',
        component: ReadingComprehensions,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/reading-comprehensions/reading-comprehension',
        component: ReadingComprehension,
        roles: ['Administrator', 'Test Developer'],
    },
    {
        path: '/reading-comprehensions/reading-comprehension/:id',
        component: ReadingComprehension,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/clozes',
        component: Clozes,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/clozes/cloze',
        component: Cloze,
        roles: ['Administrator', 'Test Developer'],
    },
    {
        path: '/clozes/cloze/:id',
        component: Cloze,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/tests/',
        component: Tests,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/tests/test',
        component: Test,
        roles: ['Administrator', 'Test Developer'],
    },
    {
        path: '/tests/test/:id',
        component: Test,
        roles: ['Administrator', 'Instructor', 'Test Developer'],
    },
    {
        path: '/users',
        component: Users,
        roles: 'Administrator',
    },
    {
        path: '/users/user',
        component: User,
        roles: 'Administrator',
    },
    {
        path: '/users/user/:id',
        component: User,
        roles: ['Administrator'],
    },
    {
        path: '/test-sessions/',
        component: TestSessions,
        roles: ['Instructor', 'Administrator', 'Test Developer'],
    },
    {
        path: '/test-sessions/test-session/:id',
        component: TestSession,
        roles: ['Instructor', 'Administrator', 'Test Developer'],
    },
    {
        path: '/test-categories/',
        component: TestCategories,
        roles: 'Administrator',
    },
    {
        path: '/test-categories/test-category',
        component: TestCategory,
        roles: 'Administrator',
    },
    {
        path: '/test-categories/test-category/:id',
        component: TestCategory,
        roles: 'Administrator',
    },
    {
        path: '/demographic-questionnaire-fields/',
        component: DemographicQuestionnaireFields,
        roles: 'Administrator',
    },
    {
        path: '/demographic-questionnaire-fields/demographic-questionnaire-field',
        component: DemographicQuestionnaireField,
        roles: 'Administrator',
    },
    {
        path: '/demographic-questionnaire-fields/demographic-questionnaire-field/:id',
        component: DemographicQuestionnaireField,
        roles: 'Administrator',
    },
    {
        path: '/student-classes',
        component: StudentClasses,
        roles: 'Administrator',
    },
    {
        path: '/student-classes/student-class',
        component: StudentClass,
        roles: ['Administrator', 'Instructor'],
    },
    {
        path: '/student-classes/student-class/:id',
        component: StudentClass,
        roles: ['Administrator', 'Instructor'],
    },
    {
        path: '/test-assignations',
        component: TestAssignations,
        roles: 'Administrator',
    },
    {
        path: '/test-assignations/test-assignation',
        component: TestAssignation,
        roles: 'Administrator',
    },
    {
        path: '/test-assignations/test-assignation/:id',
        component: TestAssignation,
        roles: ['Administrator', 'Instructor'],
    },
    {
        path: '/writings',
        component: Writings,
        roles: ['Administrator', 'Test Developer', 'Instructor'],
    },
    {
        path: '/writings/writing',
        component: Writing,
        roles: ['Administrator', 'Test Developer'],
    },
    {
        path: '/writings/writing/:id',
        component: Writing,
        roles: ['Administrator', 'Test Developer', 'Instructor'],
    },
    {
        path: '/enumerations/',
        component: Enumerations,
        roles: 'Administrator',
    },
    {
        path: '/enumerations/enumeration',
        component: Enumeration,
        roles: 'Administrator',
    },
    {
        path: '/enumerations/enumeration/:id',
        component: Enumeration,
        roles: 'Administrator',
    },
    {
        path: '/user-field-types/',
        component: UserFieldTypes,
        roles: 'Administrator',
    },
    {
        path: '/user-field-types/user-field-type',
        component: UserFieldType,
        roles: 'Administrator',
    },
    {
        path: '/user-field-types/user-field-type/:id',
        component: UserFieldType,
        roles: 'Administrator',
    },
    {
        path: '/roles/',
        component: Roles,
        roles: 'Administrator',
    },
    {
        path: '/instructor/student-class/',
        component: InstructorStudentClass,
        roles: 'Instructor',
    },
    {
        path: '/instructor/student-class/:id',
        component: InstructorStudentClass,
        roles: 'Instructor',
    },
    {
        path: '/instructor/schedule',
        component: InstructorSchedule,
        roles: 'Instructor',
    },
    {
        path: '/instructor/schedule/create',
        component: InstructorTestAssignation,
        roles: 'Instructor',
    },
    {
        path: '/instructor/student',
        component: Student,
        roles: 'Instructor',
    },
    {
        path: '/instructor/student/:id',
        component: Student,
        roles: 'Instructor',
    },
    {
        path: '/instructor/test-assignation/:id',
        component: TestAssignation,
        roles: 'Instructor',
    },
    {
        path: '/instructor/test-sessions/:id',
        component: InstructorTestSessions,
        roles: 'Instructor',
    },
    {
        path: '/instructor/test-session/:id',
        component: TestSession,
        roles: 'Instructor',
    },
    {
        path: '/test-taker/schedule',
        component: TestTakerSchedule,
        roles: 'Test Taker',
    },
    {
        path: '/test/wizard/preview',
        component: (...props) => (
            <TestWizard
                {...props}
                preview
            />
        ),
        roles: ['Administrator', 'Test Developer', 'Instructor'],
    },
    {
        path: '/test-developer/test/:id',
        component: Test,
        roles: 'Test Developer',
    },
    {
        path: '/test-developer/test',
        component: Test,
        roles: 'Test Developer',
    },
    {
        path: '/test-developer/test-sessions/:id',
        component: TestDeveloperTestSessions,
        roles: 'Test Developer',
    },
    {
        path: '/test-developer/test-session/:id',
        component: TestSession,
        roles: 'Test Developer',
    },
    {
        path: '*',
        component: NotFound,
        roles: '*',
    },
];
