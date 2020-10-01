import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ToastsStore } from 'react-toasts';
import Button from '@material-ui/core/Button';
import ClozeForm from './Form';
import { PaginatedList, Layout, NotFound, Confirmation } from '../common';
import Question from './Question';
import ActionToast from '../common/ActionToast';
import {
    useForm,
    useDialog,
    useFormData,
    useFormLayout,
    usePagination,
    useFormActions,
    useFormButtons,
} from '../../hooks';
import ClozeQuestionCorrectlyTyped from './ClozeQuestionCorrectlyTyped';
import ClozeQuestionIncorrectlyTyped from './ClozeQuestionIncorrectlyTyped';
import ClozeQuestionPendingTyped from './ClozeQuestionPendingTyped';
import Checkbox from '../form/fields/Checkbox';
import InteractiveTextEditor from './InteractiveTextEditor';

function Cloze({ match }) {
    const entity = 'cloze';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const [questions, setQuestions] = useState([]);
    const [previousQuestions, setPreviousQuestions] = useState([]);
    const [previousText, setPreviousText] = useState('');
    const [openActionToast, setOpenActionToast] = useState(false);
    const [actionToastMessage, setActionToastMessage] = useState('');
    const [questionIsGenerated, setQuestionIsGenerated] = useState(false);
    const questionsRef = useRef(null);
    const previousQuestionsRef = useRef(null);
    const previousTextRef = useRef(null);
    previousTextRef.current = previousText;
    questionsRef.current = questions;
    previousQuestionsRef.current = previousQuestions;

    const getQuestions = () => questionsRef.current || [];

    const getPreviousQuestions = () => previousQuestionsRef.current || [];

    const getPreviousText = () => previousTextRef.current || '';

    const layout = useFormLayout(entity);

    const pageSize = 5;
    const {
        page,
        count,
        setPage,
        data: paginatedData,
    } = usePagination(getQuestions(), pageSize);

    const initialize = cloze => {
        if (!_.isEmpty(cloze)) {
            setQuestions(cloze.questions);
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
        controls.register({ name: 'text' });
        controls.setValue('text', !_.isEmpty(data.text) && !_.isNil(data.text) ? data.text : '');
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
                const result = await actions.create(data);
                if (!_.isNil(result)) {
                    setData(result);
                    actions.cancel();
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
    });

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
        const questions = getQuestions();
        const index = questions.indexOf(data);
        updatedData.id = _.get(data, 'id');
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
            setQuestionIsGenerated(true);
        } catch (err) {
            ToastsStore.error('An error occured while genearting questions, please double check the cloze text');
        }
    };

    const showDialog = useDialog({ onConfirm: generateQuestions });

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <ClozeForm
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
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
                        <div>
                            <Button
                                color='primary'
                                onClick={
                                    _.isEmpty(getQuestions())
                                        ? generateQuestions
                                        : () => showDialog('Generating the cloze will wipe out your current questions, are you sure?')
                                }
                            >
                                Generate Cloze
                            </Button>
                        </div>
                    </div>
                    <div className='my-3 mb-3'>
                        <div className='cloze-sub-title mb-4'><u>All Questions</u></div>
                        <PaginatedList
                            count={Math.ceil(count / pageSize) || 1}
                            data={paginatedData}
                            emptyTitle='This cloze has no questions'
                            onPaginationChange={pageNumber => setPage(pageNumber)}
                            page={page}
                            renderRow={(data, index) => {
                                const questionId = data.id;
                                return (
                                    <Question
                                        key={`cloze-question-${index}`}
                                        correct={data.correct}
                                        onRemove={() => onRemoveQuestion(data)}
                                        onUpdate={updatedData => onUpdateQuestion(data, updatedData)}
                                        options={data.options}
                                        sequence={((page - 1) * (pageSize)) + index + 1}
                                        text={data.text}
                                        typed={data.typed}
                                    >
                                        {questionId && !questionIsGenerated && (
                                            <div className='field cloze-question-lists'>
                                                <ClozeQuestionPendingTyped id={questionId} />
                                                <ClozeQuestionCorrectlyTyped id={questionId} />
                                                <ClozeQuestionIncorrectlyTyped id={questionId} />
                                            </div>
                                        )}
                                    </Question>
                                );
                            }}
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
                message={actionToastMessage}
                onClose={() => {
                    setOpenActionToast(false);
                }}
                onUndo={() => {
                    setOpenActionToast(false);
                    setQuestions(getPreviousQuestions());
                    controls.setValue('text', getPreviousText());
                }}
                open={openActionToast}
            />
            <Confirmation />
        </Layout>
    );
}

Cloze.propTypes = { match: PropTypes.object.isRequired };

export default Cloze;
