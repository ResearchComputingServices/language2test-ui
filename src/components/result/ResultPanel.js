import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import ResultHeader from './ResultHeader';

function ResultPanel({
    title,
    marks,
    pending,
    defaultExpanded,
    children,
}) {
    return (
        children
            ? (
                <ExpansionPanel
                    className='results-result-panel'
                    defaultExpanded={defaultExpanded}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <ResultHeader
                            marks={marks}
                            pending={pending}
                            size='medium'
                            title={title}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className='results-result-panel-details'>
                            {children}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
            : (
                <Card className='results-result-panel-non-expandable'>
                    <ResultHeader
                        marks={marks}
                        pending={pending}
                        size='medium'
                        title={title}
                    />
                </Card>
            )
    );
}

ResultPanel.propTypes = {
    title: PropTypes.string.isRequired,
    marks: PropTypes.string,
    defaultExpanded: PropTypes.bool,
    children: PropTypes.node,
    pending: PropTypes.bool,
};

ResultPanel.defaultProps = {
    marks: null,
    defaultExpanded: false,
    children: null,
    pending: false,
};

export default ResultPanel;
