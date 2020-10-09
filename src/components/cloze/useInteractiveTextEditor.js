import { useRefState } from '../../hooks';

export default function(text) {
    const [getTextarea, setTextarea] = useRefState(text);
    const [getText, setText] = useRefState(text || '');
    const [getValue, setValue] = useRefState('text');
    const [getEditMode, setEditMode] = useRefState(!getText());

    return {
        getText,
        getValue,
        getEditMode,
        getTextarea,
        setTextarea,
        setText,
        setValue,
        setEditMode,
    };
}
