import _ from 'lodash';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import {
    useForm,
    useStore,
    useService,
    useFormData,
    useFormActions,
    useFormButtons,
    useFormLayout,
} from '../../hooks';
import { Layout, NotFound } from '../common';
import Form from './Form';

function Role({ match }) {
    const entity = 'role';
    const id = _.get(match, 'params.id');
    const controls = useForm();
    const layout = useFormLayout(entity);
    const immutableActions = ['Create', 'Update', 'Delete'];
    const [immutable, setImmutable] = useState(false);
    const [authorizationDependencyMap, setAuthorizationDependencyMap] = useState({});
    const [selectedAuthorizations, setSelectedAuthorizations] = useState({});
    const [authorizationsByCategory, setAuthorizationsByCategory] = useState({});
    const authorizationService = useService('authorization');
    const userSession = useStore('userSession');

    const selectedAuthorizationsRef = useRef(null);
    selectedAuthorizationsRef.current = selectedAuthorizations;

    const getAllAuthorizations = () => authorizationService.get();

    const isDependencyChecked = authorizationName => {
        const authorizationsCheckedSet = new Set([authorizationName]);
        const authorizationsToCheck = [authorizationName];
        let isDependencySelected = false;
        while (authorizationsToCheck.length !== 0) {
            const authorizationName = authorizationsToCheck.pop();
            const dependencies = authorizationDependencyMap[authorizationName];
            // eslint-disable-next-line no-loop-func
            _.some(dependencies, dependency => {
                if (!authorizationsCheckedSet.has(dependency)) {
                    isDependencySelected = selectedAuthorizationsRef.current[dependency] || false;
                    if (isDependencySelected) return true;
                    authorizationsCheckedSet.add(dependency);
                    authorizationsToCheck.push(dependency);
                }
            });
        }
        return isDependencySelected;
    };

    const getSelectedAuthorizations = () => {
        const authorizations = [];
        _.each(selectedAuthorizationsRef.current, (isSelected, authorization) => {
            if (_.eq(isSelected, true) || isDependencyChecked(authorization)) {
                authorizations.push({ name: authorization });
            }
        });
        return authorizations;
    };

    const roleInUserSession = data => {
        const { roles } = userSession;
        return _.some(roles, role => _.eq(data.name, role.name));
    };

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 800);
    };

    const isImmutable = data => (_.isBoolean(data.immutable) ? data.immutable : true);

    const {
        data,
        loading,
        error,
        setData,
        setError,
    } = useFormData(entity, id, async data => {
        !_.isNil(id) && setImmutable(isImmutable(data));
        const formAuthorizations = new Set(_.map(_.get(data, 'authorizations', []), authorization => authorization.name));
        try {
            const allAuthorizations = await getAllAuthorizations();
            setAuthorizationsByCategory(_.groupBy(allAuthorizations, 'category'));
            setSelectedAuthorizations(_.reduce(allAuthorizations, (accumulator, authorization) => {
                accumulator[authorization.name] = formAuthorizations.has(authorization.name);
                return accumulator;
            }, {}));
            setAuthorizationDependencyMap(_.reduce(allAuthorizations, (accumulator, authorization) => {
                const { dependencies, name } = authorization;
                _.each(dependencies, dependency => {
                    if (!(dependency in accumulator)) {
                        accumulator[dependency] = [name];
                    } else {
                        accumulator[dependency].push(name);
                    }
                });
                return accumulator;
            }, {}));
        } catch (err) {
            setError(_.get(err, 'response.status', true) || true);
        }
    });

    const actions = useFormActions(entity);

    const buttons = _.filter(useFormButtons(id, entity, {
        ...actions,
        create: async data => {
            data.authorizations = getSelectedAuthorizations();
            const result = await actions.create(data);
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
                if (roleInUserSession(data)) {
                    refreshPage();
                }
            }
        },
        update: async data => {
            data.authorizations = getSelectedAuthorizations();
            const result = await actions.update(data);
            if (!_.isNil(result)) {
                setData(result);
                actions.cancel();
                if (roleInUserSession(data)) {
                    refreshPage();
                }
            }
        },
    }), action => {
        const immutableActionAndImmutable = (_.isObject(action) && immutableActions.includes(action.title) && immutable);
        return !immutableActionAndImmutable;
    });

    const getActionName = text => _.upperFirst(_.first(text.split('-')));

    const getForm = id => (
        !_.isNil(id) && _.isEmpty(data)
            ? <NotFound />
            : (
                <Form
                    buttons={buttons}
                    controls={controls}
                    data={data}
                    layout={layout}
                    title={`${!_.isNil(id) ? 'Edit' : 'New'} Role`}
                >
                    <div className='field'>
                        {_.reduce(authorizationsByCategory, (accumulator, authorizations, category) => {
                            accumulator.push((
                                <ExpansionPanel
                                    key={category}
                                    className='authorization-expansion-panel my-3'
                                    defaultExpanded
                                >
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <FormLabel component='legend'>{category}</FormLabel>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className='pb-4'>
                                        <FormControl
                                            className='w-100'
                                            component='fieldset'
                                        >
                                            <FormGroup
                                                className='authorizations'
                                            >
                                                {_.map(authorizations, ({ name, text }) => (
                                                    <Tooltip
                                                        key={name}
                                                        title={text}
                                                    >
                                                        <FormControlLabel
                                                            checked={
                                                                selectedAuthorizationsRef.current[name]
                                                                    || (isDependencyChecked(name))
                                                                    || false
                                                            }
                                                            className='my-3 mr-5'
                                                            control={<Checkbox color='primary' />}
                                                            disabled={immutable || (isDependencyChecked(name))}
                                                            label={getActionName(name)}
                                                            onChange={(...args) => {
                                                                const [, value] = args;
                                                                const newSelectedAuthorizations = { ...selectedAuthorizationsRef.current };
                                                                newSelectedAuthorizations[name] = value;
                                                                setSelectedAuthorizations(newSelectedAuthorizations);
                                                            }}
                                                            value={name}
                                                        />
                                                    </Tooltip>
                                                ))}
                                            </FormGroup>
                                        </FormControl>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            ));
                            return accumulator;
                        }, [])}

                    </div>
                </Form>
            ));

    return (
        <Layout
            error={error}
            loading={loading}
            unmountOnLoad
        >
            {getForm(id)}
        </Layout>
    );
}

Role.propTypes = { match: PropTypes.object.isRequired };

export default Role;
