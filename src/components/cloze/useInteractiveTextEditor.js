import { useRefState } from '../../hooks';

export default function(text) {
    const [getTextarea, setTextarea] = useRefState(text);
    const [getData, setData] = useRefState({
        present: text || '',
        undo: [],
        redo: [],
    });
    const [getValue, setValue] = useRefState('text');
    const [getSelected, setSelected] = useRefState({
        selected: '',
        startIndex: 0,
        endIndex: 0,
    });
    const [getEditMode, setEditMode] = useRefState(!getData());
    const [getUnMarkAsBlank, setUnMarkAsBlank] = useRefState(false);

    return {
        getSelected,
        getData,
        getUnMarkAsBlank,
        getValue,
        getEditMode,
        getTextarea,
        setTextarea,
        setData,
        setValue,
        setSelected,
        setEditMode,
        setUnMarkAsBlank,
    };
}
