import { useRefState } from '../../hooks';

export default function useBlank(initialValue) {
    const [getWidth, setWidth] = useRefState(100);
    const [getToggle, setToggle] = useRefState(false);
    const [getValue, setValue] = useRefState(initialValue);
    const [getJustSelected, setJustSelected] = useRefState(false);

    return {
        getWidth,
        getToggle,
        getValue,
        setWidth,
        setToggle,
        setValue,
        getJustSelected,
        setJustSelected,
    };
}
