import Component from '../../../components/main';
import { createSnapshotTest, createTest } from '../../../testUtilities';
import administrator from '../../../__mocks__/userSession/administrator';
import testTaker from '../../../__mocks__/userSession/testTaker';
import defaultTestWizardSession from '../../../__mocks__/testWizardSession/default';
import dialog from '../../../__mocks__/dialog/default';
import drawer from '../../../__mocks__/drawer/default';

describe('main', () => {
    it('should match snapshot when user has the role of "Administrator"', createSnapshotTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: administrator,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer,
        },
        mount: true,
    }));

    it('should match snapshot when user has the role of "Test Taker"', createSnapshotTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: testTaker,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer,
        },
        mount: true,
    }));

    it('should have title labeled as "Test Taker User"', createTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: testTaker,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer,
        },
        mount: true,
    }, tree => expect(tree.find('.user-menu').text()).toBe('Test Taker User')));

    it('should have logo', createTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: testTaker,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer,
        },
        mount: true,
    }, tree => expect(tree.find('.logo').type()).toBe('img')));

    it('should have app title labeled as "Platform for Testing Language Learners"', createTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: testTaker,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer,
        },
        mount: true,
    }, tree => expect(tree.find('.app-title').text()).toBe('Platform for Testing Language Learners')));

    it('should have clickable hamburger menu button when drawer is not open but enabled', createTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: administrator,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer: {
                open: false,
                enabled: true,
            },
        },
        mount: true,
    }, tree => expect(tree.find('.hamburger-button').at(0).hasClass('hide')).toBeFalsy()));

    it('should not have clickable hamburger menu button when drawer is disabled', createTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: administrator,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer: {
                open: false,
                enabled: false,
            },
        },
        mount: true,
    }, tree => expect(tree.find('.hamburger-button').at(0).hasClass('hide')).toBeTruthy()));

    it('should have username as "Administrator User" when "Administrator User" is logged on.', createTest(Component, {
        props: { authenticate: false },
        state: {
            userSession: administrator,
            testWizardSession: defaultTestWizardSession,
            dialog,
            drawer: {
                open: false,
                enabled: false,
            },
        },
        mount: true,
    }, tree => expect(tree.find('.display-name').at(0).text()).toBe('Administrator User')));
});
