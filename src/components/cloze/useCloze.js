import { useRefState } from '../../hooks';

export default function useCloze() {
    const [getQuestions, setQuestions] = useRefState([]);
    const [getPreviousQuestions, setPreviousQuestions] = useRefState([]);
    const [getPreviousText, setPreviousText] = useRefState('');
    const [getOpenActionToast, setOpenActionToast] = useRefState(false);
    const [getActionToastMessage, setActionToastMessage] = useRefState('');
    const [getClone, setClone] = useRefState(false);

    return {
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
    };
}
