import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpandableInfo = ({
    title,
    children,
    defaultExpanded,
    className,
    style,
}) => (
    <ExpansionPanel
        className={`expandable-info mb-4 ${className}`}
        defaultExpanded={defaultExpanded}
        style={style}
    >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h1><u>{title}</u></h1>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            {children}
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

ExpandableInfo.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    defaultExpanded: PropTypes.bool,
};

ExpandableInfo.defaultProps = {
    title: '',
    children: null,
    className: undefined,
    style: undefined,
    defaultExpanded: true,
};

export default ExpandableInfo;
