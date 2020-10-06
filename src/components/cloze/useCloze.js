import { useRefState } from '../../hooks';

export default function useCloze() {
    const [getQuestions, setQuestions] = useRefState([]);
    const [getPreviousQuestions, setPreviousQuestions] = useRefState([]);
    const [getPreviousText, setPreviousText] = useRefState('');
    const [getOpenActionToast, setOpenActionToast] = useRefState(false);
    const [getActionToastMessage, setActionToastMessage] = useRefState('');
    const [getQuestionIsGenerated, setQuestionIsGenerated] = useRefState(false);
    const [getClone, setClone] = useRefState(false);

    return {
        getQuestions,
        getPreviousQuestions,
        getPreviousText,
        getOpenActionToast,
        getActionToastMessage,
        getQuestionIsGenerated,
        getClone,
        setQuestions,
        setPreviousQuestions,
        setPreviousText,
        setOpenActionToast,
        setActionToastMessage,
        setQuestionIsGenerated,
        setClone,
    };
}