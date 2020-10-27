import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import { PaginatedList, Layout, NotFound } from '../common';
import ImageUploader from '../imageUploader';
import Question from './Question';
import NewQuestion from './NewQuestion';
import ActionToast from '../common/ActionToast';
import {
    useRef,
    useForm,
    useStore,
    useState,
    useEffect,
    useActions,
    useService,
    useRefState,
    useFormData,
    usePagination,
    useFormLayout,
    useFormActions,
    useFormButtons,
} from '../../hooks';

function ReadingComprehension({ match }) {
    const rights = {
        create: ['Administrator'],
        update: ['Administrator'],
        delete: ['Administrator'],
        export: ['Administrator'],
    };
    const entity = 'readingComprehension';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const {
        setValue,
        register,
        unregister,
    } = controls;
    const cloneStore = useStore('clone');
    const cloneActions = useActions('clone');
    const historyService = useService('history');
    const [dynamicLayout, setDynamicLayout] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [previousQuestions, setPreviousQuestions] = useState([]);
    const [openActionToast, setOpenActionToast] = useState(false);
    const [actionToastMessage, setActionToastMessage] = useState('');
    const questionsRef = useRef(null);
    const previousQuestionsRef = useRef(null);
    questionsRef.current = questions;
    previousQuestionsRef.current = previousQuestions;
    const [getClone, setClone] = useRefState(false);

    const getQuestions = () => questionsRef.current || [];

    const getPreviousQuesitons = () => previousQuestionsRef.current || [];

    // Registering a field that is hidden on the form.
    useEffect(() => {
        register({ name: 'filename' });
        return () => unregister('filename');
    }, [register, unregister]);

    const onImageUpload = async data => setValue('filename', data.name);

    const pageSize = 5;
    const {
        page,
        setPage,
        data: paginatedData,
        count,
    } = usePagination(getQuestions(), pageSize);

    const initialize = readingComprehension => {
        const { getValues, clearError } = controls;
        clearError();
        readingComprehension = _.isNil(readingComprehension) ? getValues() : readingComprehension;
        setValue('filename', _.get(readingComprehension, 'filename'));
        const dynamicLayout = [];
        dynamicLayout.push({
            type: 'raw',
            content: (
                <ImageUploader
                    className='field mt-5'
                    imageName={getValues('filename')}
                    onUpload={onImageUpload}
                />
            ),
        });
        setDynamicLayout(dynamicLayout);
        setQuestions(readingComprehension.questions);
        if (_.isNil(id)) {
            const initializationData = _.omit(cloneStore.data, ['id', 'name']);
            cloneActions.reset();
            controls.reset(initializationData);
            setQuestions(initializationData.questions);
            setClone(true);
        }
    };

    const layout = useFormLayout(entity);

    const {
        data,
        error,
        loading,
        setData,
    } = useFormData(entity, id, initialize);

    const actions = useFormActions(entity, 'reading comprehension');

    const buttons = useFormButtons(id, entity, {
        ...actions,
        create: _.isEmpty(getQuestions())
            ? false
            : async data => {
                data.questions = getQuestions();
                const result = await actions.create(data);
                if (!_.isNil(result)) {
                    setData(result);
                    getClone() ? historyService.go('/reading-comprehensions') : actions.cancel();
                }
            },
        update: _.isEmpty(getQuestions())
            ? false
            : async data => {
                data.questions = getQuestions();
                const result = await actions.update(data);
                if (!_.isNil(result)) {
                    setData(result);
                }
            },
    }, rights, data.immutable, data.unremovable);

    const onAddQuestion = data => {
        const questions = getQuestions();
        let { sequence: index } = data;
        if (index > questions.length || _.isNil(index) || _.isEmpty(index)) {
            index = questions.length + 1;
        }
        delete data.sequence;
        data.correct = _.parseInt(data.correct);
        const newQuestions = [...questions];
        newQuestions.splice(index - 1, 0, data);
        setPreviousQuestions(questions);
        setQuestions(newQuestions);
        setOpenActionToast(true);
        setActionToastMessage('New question added');
    };

    const onRemoveQuestion = data => {
        const questions = getQuestions();
        const index = questions.indexOf(data);
        const newQuestions = (questions.slice(0, index)).concat(questions.slice(index + 1, questions.length));
        setPreviousQuestions(questions);
        setQuestions(newQuestions);
        setOpenActionToast(true);
        setActionToastMessage(`Question-${index + 1} has been removed`);
    };

    const onUpdateQuestion = (data, updatedData) => {
        updatedData.options = _.map(updatedData.options, option => (_.isObject(option) ? option : { text: option }));
        const questions = getQuestions();
        const index = questions.indexOf(data);
        const newQuestions = (questions.slice(0, index)).concat([updatedData]).concat(questions.slice(index + 1, questions.length));
        setPreviousQuestions(questions);
        setQuestions(newQuestions);
        setOpenActionToast(true);
        setActionToastMessage(`Question-${index + 1} has been updated`);
    };

    const onClone = () => {
        const dataToClone = controls.getValues();
        dataToClone.questions = _.map(getQuestions(), question => {
            const newQuestion = _.omit(question, ['id', 'rcId', 'rc']);
            newQuestion.options = _.map(newQuestion.options, option => ({ text: option.text }));
            return newQuestion;
        });
        cloneActions.setData(dataToClone);
        historyService.go('/reading-comprehensions/reading-comprehension');
    };

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    dynamicLayout={dynamicLayout}
                    layout={layout}
                    onClone={!getClone() ? onClone : undefined}
                    readonly={data.immutable}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Reading Comprehension`}
                >
                    <div className='reading-comprehension-sub-title mb-4'><u>Add Question</u></div>
                    <NewQuestion
                        onAdd={onAddQuestion}
                        totalQuestions={getQuestions().length}
                    />
                    <div className='my-3 mb-3'>
                        <div className='reading-comprehension-sub-title mb-4'><u>All Questions</u></div>
                        <PaginatedList
                            count={Math.ceil(count / pageSize) || 1}
                            data={paginatedData}
                            emptyTitle='This reading comprehension has no questions'
                            onPaginationChange={pageNumber => setPage(pageNumber)}
                            page={page}
                            renderRow={(data, index) => (
                                <Question
                                    key={`reading-comprehension-question-${index}`}
                                    correct={data.correct}
                                    onRemove={() => onRemoveQuestion(data)}
                                    onUpdate={updatedData => onUpdateQuestion(data, updatedData)}
                                    options={data.options}
                                    sequence={((page - 1) * (pageSize)) + index + 1}
                                    text={data.text}
                                />
                            )}
                        />
                    </div>
                </Form>
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
                    setQuestions(getPreviousQuesitons());
                }}
                open={openActionToast}
            />
        </Layout>
    );
}

ReadingComprehension.propTypes = { match: PropTypes.object.isRequired };

export default ReadingComprehension;
