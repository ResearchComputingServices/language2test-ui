import { useRefState } from '../../hooks';

export default function useListModal(data = []) {
    return useRefState(data.map(data, () => false));
}
