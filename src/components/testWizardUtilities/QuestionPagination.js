import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FlagIcon from '@material-ui/icons/Flag';
import _ from 'lodash';

function QuestionPagination({
    className,
    count,
    page,
    onChange,
    answers,
}) {
    const elements = [];

    const initializeState = (count, page) => {
        const selected = [];
        const flags = [];
        _.times(count, index => {
            _.eq(index, page - 1)
                ? selected.push(true)
                : selected.push(false);
            flags.push(false);
        });
        return {
            selected,
            currentlySelected: page - 1,
            flags,
        };
    };

    // No need to create a ref for events because objects can be accessed via memory, therefore state closures bound to events will not be stale.
    const [state, setState] = useState(initializeState(count, page));

    const { selected, flags } = state;

    const highlightSelected = index => {
        const newSelected = [...state.selected];
        for (let i = 0; i < newSelected.length; ++i) {
            if (i === index) {
                newSelected[i] = true;
            } else {
                newSelected[i] = false;
            }
        }
        setState({
            ...state,
            selected: newSelected,
            currentlySelected: index,
        });
    };

    const flagQuestion = index => {
        const flags = [...state.flags];
        flags[index] = !flags[index];
        setState(state => ({
            ...state,
            flags,
        }));
    };

    const onPageButtonClick = (event, index) => {
        highlightSelected(index);
        onChange(event, index + 1);
    };

    _.times(count, index => {
        elements.push(
            <li
                key={`${count}-${index}`}
                className='d-flex flex-column justify-content-center align-items-center'
            >
                <FlagIcon
                    className={`${_.eq(flags[index], true) ? 'question-pagination-flagged' : ''} question-pagination-flag`}
                    onClick={() => flagQuestion(index)}
                />
                <button
                    aria-label={`Go to page ${index + 1}`}
                    className={`
                            question-pagination-button
                            question-pagination-button-outlined
                            question-pagination-button-outlined-primary
                            ${_.eq(selected[index], true) ? 'question-pagination-button-selected' : ''}
                            ${!_.isNil(_.get(answers[index], 'text')) ? 'question-pagination-answered' : ''}
                        `}
                    onClick={event => onPageButtonClick(event, index)}
                    tabIndex='0'
                    type='button'
                >
                    {index + 1}
                    <span className='question-pagination-button-ripple' />
                </button>
            </li>,
        );
    });

    useEffect(() => {
        const selections = Array(count).fill(false);
        selections[page - 1] = true;
        setState(state => ({
            selected: selections,
            currentlySelected: page - 1,
            flags: state.flags,
        }));
    // Anytime these props change we re-initialize the state.
    }, [page, count]);

    return (
        <nav className={className}>
            <ul className='question-pagination'>
                {elements}
            </ul>
        </nav>
    );
}

QuestionPagination.propTypes = {
    className: PropTypes.string,
    count: PropTypes.number.isRequired,
    page: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    answers: PropTypes.array,
};

QuestionPagination.defaultProps = {
    className: '',
    page: 1,
    answers: [],
};

export default QuestionPagination;
