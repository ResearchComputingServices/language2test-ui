import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Layout } from '../common';
import WizardControls from '../testWizardUtilities/WizardControls';
import {
    useMount,
    useStore,
    useTestWizardStores,
    useService,
    useActions,
} from '../../hooks';
import TestWizardResults from '../testWizardResult';
import testWizardSteps from '../../config/wizardSteps/testWizardSteps';

export default function() {
    const showStepAnswers = false;
    const historyService = useService('history');
    const {
        activeStep,
        endDatetime,
        wizardSteps: steps,
    } = useStore('testWizardSession');
    const {
        key: dialogKey,
        confirmed: dialogConfirmed,
        canceled: dialogCanceled,
    } = useStore('dialog');
    const { setActiveStep, reset } = useActions('testWizardSession');
    const { showDialog, hideDialog } = useActions('dialog');
    const { hide: hideDrawer } = useActions('drawer');

    useMount(hideDrawer);

    const [isBackButtonClicked, setBackbuttonPress] = useState(false);

    useEffect(() => {
        if (dialogConfirmed && _.eq(dialogKey, 'testWizard')) {
            setBackbuttonPress(true);
            historyService.go('/test');
            hideDialog();
            reset();
        }
    }, [dialogConfirmed, dialogKey, hideDialog, historyService, reset]);

    useEffect(() => {
        if (dialogCanceled && _.eq(dialogKey, 'testWizard')) {
            window.history.pushState(null, null, window.location.pathname);
            setBackbuttonPress(false);
            hideDialog();
        }
    }, [dialogCanceled, dialogKey, hideDialog]);

    const onBackButtonEvent = useCallback(e => {
        e.preventDefault();
        if (!isBackButtonClicked) {
            showDialog({
                title: 'Data will be lost if you leave the page, are you sure?',
                key: 'testWizard',
            });
        } else {
            historyService.go('/test');
            reset();
        }
    }, [isBackButtonClicked, showDialog, historyService, reset]);

    useEffect(() => {
        if (!_.isNil(endDatetime)) {
            setBackbuttonPress(true);
        }
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, [endDatetime, onBackButtonEvent]);

    if (_.isNil(steps) || _.isEmpty(steps)) {
        historyService.go('/test');
    }

    const stores = useTestWizardStores();

    const getStore = storeName => _.get(stores, storeName, {});

    const getCurrentStep = stepIndex => {
        const step = steps[stepIndex];
        if (_.isNil(step)) return null;
        const currentStep = testWizardSteps[step.type];
        return currentStep;
    };

    const getStepStore = stepIndex => {
        const currentStep = getCurrentStep(stepIndex);
        // TODO Might need to revisit this in the future. As I am falling back to results store. Has potential for a cleaner solution.
        return _.isNil(currentStep) ? getStore('results') : getStore(currentStep.storeName);
    };

    const getStepComponent = stepIndex => {
        const currentStep = getCurrentStep(stepIndex);
        return _.isNil(currentStep) ? <TestWizardResults /> : currentStep.stepComponent;
    };

    const handleNext = () => setActiveStep(activeStep + 1);

    const handleBack = () => setActiveStep(activeStep - 1);

    const shouldDisablePrevious = () => {
        if (!showStepAnswers) {
            return true;
        }
        return _.eq(activeStep, 0);
    };

    const shouldDisableNext = () => {
        const currentStep = steps[activeStep];
        if (!_.isNil(_.get(currentStep, 'valid'))) {
            return !currentStep.valid;
        }
        const nextStep = steps[activeStep + 1];
        const dependency = _.get(nextStep, 'dependency');
        const limit = activeStep >= steps.length;
        const isLast = _.eq(activeStep, steps.length - 1);
        if (isLast) {
            const store = getStepStore(activeStep);
            const progress = _.get(store, 'progress');
            if (!_.eq(progress, 'ended')) {
                return true;
            }
        }
        const evaluateDependency = d => {
            const store = getStepStore(d);
            if (!_.isNil(store)) {
                const progress = _.get(store, 'progress');
                if (!_.eq(progress, 'ended')) {
                    return !limit && true;
                }
            }
            return false;
        };
        if (!_.isNil(dependency)) {
            if (_.isArray(dependency)) {
                const dependencies = dependency;
                return dependencies.some(evaluateDependency);
            }
            return evaluateDependency(dependency);
        }
        return activeStep >= steps.length;
    };

    const activeStore = getStepStore(activeStep);

    if (!showStepAnswers && _.eq(_.get(activeStore, 'progress'), 'ended')) {
        handleNext();
    }

    return (
        <>
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                className='test-wizard'
            >
                {steps.map((step, index) => {
                    const currentStep = getCurrentStep(index);
                    return !_.isNil(currentStep) ? (
                        <Step key={currentStep.title}>
                            <StepLabel>{currentStep.title}</StepLabel>
                        </Step>
                    ) : null;
                })}
            </Stepper>
            <WizardControls
                disableNext={shouldDisableNext()}
                disablePrevious={shouldDisablePrevious()}
                handleBack={handleBack}
                handleNext={handleNext}
            />
            <Layout
                className='my-2'
                // TODO - We don't report the error that is found in results.
                error={!_.isNil(steps[activeStep]) && activeStore.error}
                loading={activeStore.loading}
            >
                {getStepComponent(activeStep)}
            </Layout>
        </>
    );
}
