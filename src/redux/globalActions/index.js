import { createAction } from '@reduxjs/toolkit';

const logout = createAction('logout');

const resetTestWizardSession = createAction('resetTestWizardSession');

const endTestWizardSession = createAction('endTestWizardSession');

export {
    logout,
    resetTestWizardSession,
    endTestWizardSession,
};
