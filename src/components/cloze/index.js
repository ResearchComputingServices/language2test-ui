import React, { useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ToastsStore } from 'react-toasts';
import ClozeForm from './Form';
import { List, Layout, NotFound, Confirmation, Button } from '../common';
import Question from './Question';
import ActionToast from '../common/ActionToast';
import {
    useForm,
    useStore,
    useDialog,
    useActions,
    useService,
    useFormData,
    useFormLayout,
    useFormActions,
    useFormButtons,
} from '../../hooks';
import Checkbox from '../form/fields/Checkbox';
import InteractiveTextEditor from './InteractiveTextEditor';
import useCloze from './useCloze';

function Cloze({ match }) {
    const entity = 'cloze';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout(entity);
    const {
        getQuestions,
        getPreviousQuestions,
        getPreviousText,
        getOpenActionToast,
        getActionToastMessage,
        getClone,
        setQuestions,
        setPreviousQuestions,
        setPreviousText,
        setOpenActionToast,
        setActionToastMessage,
        setClone,
    } = useCloze();

    const cloneStore = useStore('clone');
    const cloneActions = useActions('clone');
    const historyService = useService('history');

    const initialize = cloze => {
        if (!_.isEmpty(cloze)) {
            setQuestions(cloze.questions);
        }
        if (_.isNil(id)) {
            const initializationData = _.omit(cloneStore.data, ['id', 'name']);
            controls.register({ name: 'text' });
            cloneActions.reset();
            controls.reset(initializationData);
            setQuestions(initializationData.questions);
            setClone(true);
        }
    };

    const {
        data,
        error,
        loading,
        setData,
        service,
    } = useFormData(entity, id, initialize);

    useEffect(() => {
        if (_.isNil(controls.getValues('text'))) {
            controls.register({ name: 'text' });
            controls.setValue('text', !_.isEmpty(data.text) && !_.isNil(data.text) ? data.text : '');
        }
        return () => controls.unregister('text');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controls.register, controls.unregister]);

    useEffect(() => {
        if (!_.isEmpty(data.text) && !_.isNil(data.text)) {
            controls.setValue('text', data.text);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.text]);

    const actions = useFormActions(entity);

    const buttons = useFormButtons(id, entity, {
        ...actions,
        create: _.isEmpty(getQuestions())
            ? false
            : async data => {
                data.questions = getQuestions();
                data.text = controls.getValues('text');
                const result = await actions.create(data);
                if (!_.isNil(result)) {
                    setData(result);
                    getClone() ? historyService.go('/admin/clozes') : actions.cancel();
                }
            },
        update: _.isEmpty(getQuestions())
            ? false
            : async data => {
                const questions = getQuestions();
                data.questions = [...questions];
                const result = await actions.update(data);
                if (!_.isNil(result)) {
                    setData(result);
                    actions.cancel();
                }
            },
    }, data.immutable, data.unremovable);

    const onRemoveQuestion = data => {
        const questions = getQuestions();
        const index = questions.indexOf(data);
        const newQuestions = (questions.slice(0, index)).concat(questions.slice(index + 1, questions.length));
        setPreviousText(controls.getValues('text'));
        setPreviousQuestions(questions);
        setQuestions(newQuestions);
        setOpenActionToast(true);
        setActionToastMessage(`Question-${index + 1} has been removed`);
        const text = controls.getValues('text');
        let newText = '';
        let segment = '';
        let blankCount = 0;
        let bracketOpen = false;
        for (let i = 0; i < text.length; ++i) {
            const word = text[i];
            if (word === '*' && !bracketOpen) {
                newText += segment;
                segment = '';
                bracketOpen = true;
            } else if (word === '*' && bracketOpen) {
                if (index === blankCount++) {
                    newText += segment;
                } else {
                    newText += `*${segment}*`;
                }
                segment = '';
                bracketOpen = false;
            } else {
                segment += word;
            }
        }
        newText += segment;
        controls.setValue('text', newText);
    };

    const isTextValid = text => {
        let count = 0;
        _.each(text, word => {
            word === '*' && ++count;
        });
        return count % 2 === 0;
    };

    const onUpdateQuestion = (data, updatedData) => {
        updatedData.options = _.map(updatedData.options, option => (_.isObject(option) ? option : { text: option }));
        updatedData.acceptedAnswers = _.map(
            updatedData.acceptedAnswers,
            acceptedAnswer => (_.isObject(acceptedAnswer) ? acceptedAnswer : { text: acceptedAnswer }),
        );
        data.id && (updatedData.id = data.id);
        data.clozeId && (updatedData.clozeId = data.clozeId);
        const questions = getQuestions();
        const index = questions.indexOf(data);
        _.defaults(updatedData, data);
        const newQuestions = (questions.slice(0, index)).concat([updatedData]).concat(questions.slice(index + 1, questions.length));
        setPreviousQuestions(questions);
        setQuestions(newQuestions);
        setOpenActionToast(true);
        setActionToastMessage(`Question-${index + 1} has been updated`);
    };

    const generateQuestions = async () => {
        try {
            const text = controls.getValues('text');
            if (_.isEmpty(text)) {
                return ToastsStore.warning('Text to generate the cloze is empty');
            }
            if (!isTextValid(text)) throw new Error();
            const newQuestions = await service.generateQuestions({
                text,
                typed: controls.getValues('typed'),
            });
            setQuestions(newQuestions);
            if (!_.isEmpty(newQuestions)) {
                ToastsStore.success('Successfully generated cloze');
            } else {
                ToastsStore.warning('There are no blanks in the text');
            }
        } catch (err) {
            ToastsStore.error('An error occured while genearting questions, please double check the cloze text');
        }
    };

    const showDialog = useDialog({ onConfirm: generateQuestions });

    const onGenerateOptions = async data => {
        try {
            const [options, correct] = await service.generateOptions({ word: data.text });
            const updatedData = { ...data };
            updatedData.options = _.map(options, option => _.get(option, 'text'));
            updatedData.correct = correct;
            onUpdateQuestion(data, updatedData);
        } catch (err) {
            ToastsStore.error('An error occured while genearting options');
        }
    };

    const onClone = () => {
        const dataToClone = controls.getValues();
        dataToClone.questions = _.map(getQuestions(), question => {
            const newQuestion = _.omit(question, ['id', 'clozeId', 'cloze']);
            newQuestion.options = _.map(newQuestion.options, option => ({ text: option.text }));
            newQuestion.acceptedAnswers = _.map(newQuestion.acceptedAnswers, acceptedAnswer => ({ text: acceptedAnswer.text }));
            return newQuestion;
        });
        cloneActions.setData(dataToClone);
        historyService.go('/admin/clozes/cloze');
    };

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <ClozeForm
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    onClone={!getClone() ? onClone : undefined}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Cloze`}
                >
                    <InteractiveTextEditor controls={controls} />
                    <div className='d-flex flex-direction-row w-100 align-items-center'>
                        <Checkbox
                            controls={controls}
                            field={{
                                name: 'typed',
                                label: 'Typed',
                            }}
                        />
                    </div>
                    <div className='d-flex align-items-start'>
                        <Button
                            color='primary'
                            inline
                            onClick={
                                _.isEmpty(getQuestions())
                                    ? generateQuestions
                                    : () => showDialog('Generating the cloze will wipe out your current questions, are you sure?')
                            }
                        >
                            Generate Cloze
                        </Button>
                    </div>
                    <div className='my-3 mb-3'>
                        <div className='cloze-sub-title mb-4'><u>All Questions</u></div>
                        <List
                            data={getQuestions()}
                            emptyTitle='This cloze has no questions'
                            renderRow={(data, index, sequence) => (
                                <Question
                                    key={`cloze-question-${index}-${data.text}`}
                                    acceptedAnswers={data.acceptedAnswers}
                                    clozeId={data.clozeId}
                                    correct={data.correct}
                                    id={data.id}
                                    onGenerateOptions={() => onGenerateOptions(data)}
                                    onRemove={() => onRemoveQuestion(data)}
                                    onUpdate={updatedData => onUpdateQuestion(data, updatedData)}
                                    options={data.options}
                                    sequence={sequence}
                                    text={data.text}
                                    typed={data.typed}
                                />
                            )}
                        />
                    </div>
                </ClozeForm>
            ));

    return (
        <Layout
            error={error}
            loading={loading}
            unmountOnLoad
        >
            {getForm(id)}
            <ActionToast
                message={getActionToastMessage()}
                onClose={() => {
                    setOpenActionToast(false);
                }}
                onUndo={() => {
                    setOpenActionToast(false);
                    setQuestions(getPreviousQuestions());
                    controls.setValue('text', getPreviousText() || controls.getValues('text'));
                }}
                open={getOpenActionToast()}
            />
            <Confirmation />
        </Layout>
    );
}

Cloze.propTypes = { match: PropTypes.object.isRequired };

export default Cloze;
