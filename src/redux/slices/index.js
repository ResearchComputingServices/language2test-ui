import _ from 'lodash';
import userSession from './userSession';
import readingComprehensionTest from './readingComprehensionTest';
import results from './results';
import vocabularyTest from './vocabularyTest';
import testWizardSession from './testWizardSession';
import clozeTest from './clozeTest';
import writingTest from './writingTest';
import timer from './timer';
import dialog from './dialog';
import drawer from './drawer';
import clone from './clone';
import dashboard from './dashboard';
import instructorStudentClasses from './instructorStudentClasses';
import testTakerStudentClasses from './testTakerStudentClasses';
import testWizardSessionPreview from './testWizardSessionPreview';
import testDeveloperTestsGridFilter from './testDeveloperTestsGridFilter';
import testSessions from './testSessions';
import { logout, resetTestWizardSession, endTestWizardSession } from '../globalActions';

export const actions = {
    userSession: _.assign(userSession.actions, { logout }),
    results: results.actions,
    testWizardSession: _.assign(testWizardSession.actions, {
        resetTestWizardSession,
        endTestWizardSession,
    }),
    readingComprehensionTest: readingComprehensionTest.actions,
    vocabularyTest: vocabularyTest.actions,
    clozeTest: clozeTest.actions,
    writingTest: writingTest.actions,
    timer: timer.actions,
    dialog: dialog.actions,
    drawer: drawer.actions,
    clone: clone.actions,
    dashboard: dashboard.actions,
    instructorStudentClasses: instructorStudentClasses.actions,
    testTakerStudentClasses: testTakerStudentClasses.actions,
    testWizardSessionPreview: _.assign(testWizardSessionPreview.actions, {
        resetTestWizardSession,
        endTestWizardSession,
    }),
    testDeveloperTestsGridFilter: testDeveloperTestsGridFilter.actions,
    testSessions: testSessions.actions,
};

export const reducers = {
    userSession: userSession.reducer,
    results: results.reducer,
    testWizardSession: testWizardSession.reducer,
    readingComprehensionTest: readingComprehensionTest.reducer,
    vocabularyTest: vocabularyTest.reducer,
    clozeTest: clozeTest.reducer,
    writingTest: writingTest.reducer,
    timer: timer.reducer,
    dialog: dialog.reducer,
    drawer: drawer.reducer,
    clone: clone.reducer,
    dashboard: dashboard.reducer,
    instructorStudentClasses: instructorStudentClasses.reducer,
    testTakerStudentClasses: testTakerStudentClasses.reducer,
    testWizardSessionPreview: testWizardSessionPreview.reducer,
    testDeveloperTestsGridFilter: testDeveloperTestsGridFilter.reducer,
    testSessions: testSessions.reducer,
};
