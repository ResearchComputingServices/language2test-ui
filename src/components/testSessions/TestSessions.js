import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { Layout, ModalInfo } from '../common';
import Form from '../form';
import TestSessionsGrid from './Grid';
import {
    useGridActions,
    useRolesCheckerService,
    useForm,
    useActions,
    useStore,
} from '../../hooks';

export default function TestSessions() {
    const actions = useGridActions('testSessions');
    const rolesCheckerService = useRolesCheckerService();
    const [openFilterModal, setOpenFilterModal] = React.useState(false);
    const [filterApplied, setFilterApplied] = React.useState(false);
    const testSessionsActions = useActions('testSessions');
    const testSessions = useStore('testSessions');
    const controls = useForm();
    const tableRef = React.useRef(null);
    const userSession = useStore('userSession');

    const getQuery = filters => _.reduce(filters, (acc, value, key) => {
        if (!_.isEmpty(value)) {
            if (_.isObject(value)) {
                value = _.get(value, 'id');
            }
            acc[_.snakeCase(key)] = value;
        }
        return acc;
    }, {});

    return (
        <Layout className='my-4'>
            <TestSessionsGrid
                filterApplied={!_.isEmpty(testSessions.filters)}
                onExport={
                    rolesCheckerService.has('Administrator')
                    || rolesCheckerService.has('Instructor')
                    || rolesCheckerService.has('Test Developer')
                        ? () => actions.onExport('application/zip', 'zip', getQuery(testSessions.filters))
                        : undefined
                }
                onFilter={() => setOpenFilterModal(true)}
                onRowClick={actions.onRowClick}
                query={getQuery(testSessions.filters)}
                tableRef={tableRef}
            />
            <ModalInfo
                onHide={() => {
                    setOpenFilterModal(!openFilterModal);
                    setFilterApplied(!filterApplied);
                }}
                show={openFilterModal}
                title='Filter Test Session'
            >
                <Form
                    buttons={[
                        {
                            title: 'Apply Filters',
                            handler: data => {
                                if (data.startDatetime instanceof moment) {
                                    data.startDatetime = data.startDatetime.toISOString();
                                }
                                if (data.endDatetime instanceof moment) {
                                    data.endDatetime = data.endDatetime.toISOString();
                                }
                                testSessionsActions.setFilters(data);
                                setOpenFilterModal(false);
                                tableRef.current && tableRef.current.onQueryChange();
                            },
                        },
                        {
                            title: 'Remove Filters',
                            handler: () => {
                                testSessionsActions.setFilters({});
                                setOpenFilterModal(false);
                                tableRef.current.onQueryChange();
                            },
                        },
                    ]}
                    controls={controls}
                    data={testSessions.filters}
                    layout={[
                        {
                            field: 'startDatetime',
                            title: 'Start Datetime',
                            defaultValue: null,
                            type: 'datetime',
                        },
                        {
                            field: 'endDatetime',
                            title: 'End Datetime',
                            defaultValue: null,
                            type: 'datetime',
                        },
                        {
                            field: 'classId',
                            title: 'Class',
                            type: 'api-picklist',
                            entity: 'studentClass',
                        },
                        {
                            field: 'studentId',
                            title: 'Student',
                            type: 'api-picklist',
                            entity: 'student',
                        },
                        {
                            field: 'testId',
                            title: 'Test',
                            type: 'api-picklist',
                            entity: 'test',
                        },
                        rolesCheckerService.has('Instructor') && !rolesCheckerService.has('Adminsitrator')
                            ? {
                                field: 'instructor',
                                title: 'Instructor',
                                type: 'api-picklist',
                                query: { roles: 'Instructor' },
                                defaultValue: () => ({ name: userSession.name }),
                                disabled: true,
                                entity: 'user',
                                required: true,
                            }
                            : {
                                field: 'instructorId',
                                title: 'Instructor',
                                query: { roles: 'Instructor' },
                                type: 'api-picklist',
                                entity: 'user',
                            },
                    ]}
                />
            </ModalInfo>
        </Layout>
    );
}
