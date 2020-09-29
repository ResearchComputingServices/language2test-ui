import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ExpandableInfo } from '../common';

function ResultMetadata({ startTime, endTime, seen, attempted, answeredCorrectly }) {
    const momentStartTime = moment.utc(startTime).local();
    const momentEndTime = moment.utc(endTime).local();
    const timeFormat = 'hh:mm a';
    return (
        <ExpandableInfo title='Metadata'>

            <div className='result-metadata'>
                <p>
                    {`Answered Correctly: ${answeredCorrectly ? 'Yes' : (answeredCorrectly === null ? 'Not Answered' : 'No')}`}
                </p>
                {momentStartTime.isValid() && (
                    <p>
                        {`Started On: ${momentStartTime.isValid() ? momentStartTime.format(timeFormat) : 'Unknown'}`}
                    </p>
                )}
                {momentEndTime.isValid() && (
                    <p>
                        {`Completed On: ${momentEndTime.format(timeFormat)}`}
                    </p>
                )}
                {momentStartTime.isValid() && momentEndTime.isValid() && (
                    <p>
                        {`Time Taken: ${moment.utc(momentEndTime.diff(momentStartTime)).format('s[ second(s)]')}`}
                    </p>
                )}
                {!_.isNil(seen) && (
                    <p>
                        {`Seen: ${seen ? 'Yes' : 'No'}`}
                    </p>
                )}
                <p>{`Attempted: ${attempted ? 'Yes' : 'No'}`}</p>
            </div>
        </ExpandableInfo>
    );
}

ResultMetadata.propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    seen: PropTypes.bool,
    attempted: PropTypes.bool,
    answeredCorrectly: PropTypes.number,
};

ResultMetadata.defaultProps = {
    startTime: null,
    endTime: null,
    seen: null,
    attempted: null,
    answeredCorrectly: null,
};

export default ResultMetadata;
