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
}) => (
    <ExpansionPanel
        className='expandable-info mb-4'
        defaultExpanded={defaultExpanded}
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
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultExpanded: PropTypes.bool,
};

ExpandableInfo.defaultProps = { defaultExpanded: true };

export default ExpandableInfo;
