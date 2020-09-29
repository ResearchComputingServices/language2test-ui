import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import moment from 'moment';

function ResultStatistics({ startDatetime, endDatetime, result, gradedBy, pending }) {
    const momentStartTime = moment.utc(startDatetime).local();
    const momentEndTime = moment.utc(endDatetime).local();
    return (
        <div className='result'>
            <Card className='result-statistics'>
                <p className='mb-4'><strong><u>Test Statistics</u></strong></p>
                {momentStartTime.isValid() && (
                    <p>
                        {`Started On: ${momentStartTime.isValid() ? momentStartTime.format('LLLL') : 'Unknown'}`}
                    </p>
                )}
                <p>State: Finished</p>
                {momentEndTime.isValid() && (
                    <p>
                        {`Completed On: ${momentEndTime.format('LLLL')}`}
                    </p>
                )}
                {momentStartTime.isValid() && momentEndTime.isValid() && (
                    <p>
                        {`Time Taken: ${moment.utc(momentEndTime.diff(momentStartTime)).format('H[ hour(s)] m[ minute(s)] s[ second(s)]')}`}
                    </p>
                )}
                <p>
                    {`Graded By: ${gradedBy}`}
                </p>
                <p className='mt-3'>
                    <strong>
                        {pending && 'This section will be graded manually.'}
                        {!pending && `Grade: ${result.score}/${result.total}`}
                    </strong>
                </p>
            </Card>
        </div>
    );
}

ResultStatistics.propTypes = {
    startDatetime: PropTypes.string,
    endDatetime: PropTypes.string,
    result: PropTypes.object,
    pending: PropTypes.bool,
    gradedBy: PropTypes.string,
};

ResultStatistics.defaultProps = {
    startDatetime: null,
    endDatetime: null,
    result: {
        total: 0,
        score: 0,
    },
    pending: false,
    gradedBy: 'System Generated',
};

export default ResultStatistics;
