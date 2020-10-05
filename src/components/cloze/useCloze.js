import { useRefState } from '../../hooks';

export default function useCloze() {
    const [getQuestions, setQuestions] = useRefState([]);
    const [getPreviousQuestions, setPreviousQuestions] = useRefState([]);
    const [getPreviousText, setPreviousText] = useRefState('');
    const [getOpenActionToast, setOpenActionToast] = useRefState(false);
    const [getActionToastMessage, setActionToastMessage] = useRefState('');
    const [getQuestionIsGenerated, setQuestionIsGenerated] = useRefState(false);

    return {
        getQuestions,
        getPreviousQuestions,
        getPreviousText,
        getOpenActionToast,
        getActionToastMessage,
        getQuestionIsGenerated,
        setQuestions,
        setPreviousQuestions,
        setPreviousText,
        setOpenActionToast,
        setActionToastMessage,
        setQuestionIsGenerated,
    };
}
