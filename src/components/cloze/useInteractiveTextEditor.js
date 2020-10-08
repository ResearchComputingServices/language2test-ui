import { useRefState } from '../../hooks';

export default function(text) {
    const [getTextarea, setTextarea] = useRefState(text);
    const [getData, setData] = useRefState({
        present: text || '',
        undo: [],
        redo: [],
    });
    const [getValue, setValue] = useRefState('text');
    const [getEditMode, setEditMode] = useRefState(!getData());

    return {
        getData,
        getValue,
        getEditMode,
        getTextarea,
        setTextarea,
        setData,
        setValue,
        setEditMode,
    };
}
