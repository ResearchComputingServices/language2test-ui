import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { actions as storeActions } from '../redux/slices';

export default function useActions(storeName) {
    const actions = storeActions[storeName];
    const dispatch = useDispatch();
    return _.reduce(actions, (accumulator, functionDefinition, functionName) => {
        accumulator[functionName] = (...args) => dispatch(functionDefinition(...args));
        return accumulator;
    }, {});
}
