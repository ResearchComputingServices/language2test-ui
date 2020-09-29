/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import { useService, useState, useEffect } from '../../hooks';

export default function useList(current) {
    const [
        pending,
        correct,
        incorrect,
    ] = useService(
        'clozeQuestionPendingTyped',
        'clozeQuestionCorrectlyTyped',
        'clozeQuestionIncorrectlyTyped',
    );

    const serviceMap = { pending, correct, incorrect };

    // Basic error check in case the parameters supplied does not correspond to a service.
    if ((_.isString(current) && !(current in serviceMap))) { throw new Error('List service cannot be found.'); }

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);

    useEffect(() => {
        setLoading(false);
        setError(false);
    }, [show]);

    const onShow = () => setShow(true);

    const onHide = () => setShow(false);

    const apiCallWrapper = async func => {
        try {
            setLoading(true);
            await func();
            // TODO Hack
            setRefreshCounter(refreshCounter + 1);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(_.get(err, 'response.status', true) || true);
        }
    };

    const getCheckedData = (data, checked) => {
        const result = [];
        _.each(data, (datum, index) => {
            if (checked[index]) {
                result.push(_.omit(datum, 'id'));
            }
        });
        return result;
    };

    const onAccept = (data, checked) => {
        const checkedData = getCheckedData(data, checked);
        if (_.isEmpty(checkedData)) return;
        apiCallWrapper(async () => {
            for await (const data of checkedData) {
                await correct.add(data);
                await serviceMap[current].remove(data);
            }
        });
    };

    const onPending = async (data, checked) => {
        const checkedData = getCheckedData(data, checked);
        if (_.isEmpty(checkedData)) return;
        apiCallWrapper(async () => {
            for await (const data of checkedData) {
                await pending.add(data);
                await serviceMap[current].remove(data);
            }
        });
    };

    const onReject = async (data, checked) => {
        const checkedData = getCheckedData(data, checked);
        if (_.isEmpty(checkedData)) return;
        apiCallWrapper(async () => {
            for await (const data of checkedData) {
                await incorrect.add(data);
                await serviceMap[current].remove(data);
            }
        });
    };

    return {
        show,
        onShow,
        onHide,
        onAccept,
        onReject,
        onPending,
        loading,
        error,
        refreshCounter,
    };
}
