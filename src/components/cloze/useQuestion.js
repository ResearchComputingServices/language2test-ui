import { useForm, useRefState } from '../../hooks';

export default function useQuestion() {
    const controls = useForm();
    const [getLoading, setLoading] = useRefState(false);
    return {
        controls,
        getLoading,
        setLoading,
    };
}
