import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DownloadIcon from '@material-ui/icons/GetApp';
import UploadIcon from '@material-ui/icons/Publish';
import clsx from 'clsx';
import { FileUploader, Button, Grid } from '.';

function AdministratorGrid({
    className,
    style,
    title,
    onRowClick,
    onCreate,
    onImport,
    onExport,
    onFilter,
    entity,
    options,
    fetch,
    importFileTypes,
    tableRef: tableRefProp,
    filterApplied,
}) {
    const fileMappings = {
        xlsx: [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        txt: [
            'text/plain',
        ],
    };
    const tableRef = tableRefProp || React.createRef(null);
    return (
        <div
            className={`administrator-grids ${className}`}
            style={style}
        >
            <div className='d-flex direction-row mb-4 justify-content-between'>
                <div className='d-flex direction-row'>
                    {_.isFunction(onCreate)
                    && (
                        <Button
                            className='mr-3'
                            color='primary'
                            onClick={onCreate}
                            variant='contained'
                        >
                            Create
                        </Button>
                    )}
                    {_.isFunction(onImport)
                    && (
                        <FileUploader
                            acceptedFiles={_.reduce(
                                importFileTypes,
                                (accumulator, acceptedFileType) => accumulator.concat(fileMappings[acceptedFileType] || []), [],
                            )}
                            as={({ handleOpen }) => (
                                <Button
                                    className='mr-3'
                                    color='primary'
                                    onClick={handleOpen}
                                    startIcon={<UploadIcon />}
                                    variant='contained'
                                >
                                    Import
                                </Button>
                            )}
                            onUpload={async (...args) => {
                                await onImport(...args);
                                tableRef.current && tableRef.current.onQueryChange();
                            }}
                        />
                    )}
                    {_.isFunction(onExport)
                    && (
                        <Button
                            className='mr-3'
                            color='primary'
                            onClick={onExport}
                            startIcon={<DownloadIcon />}
                            variant='contained'
                        >
                            Export
                        </Button>
                    )}
                </div>
                {_.isFunction(onFilter) && (
                    <Button
                        className={clsx({ 'administrator-grids-applied-filter': filterApplied })}
                        color='primary'
                        onClick={onFilter}
                        startIcon={<FilterListIcon />}
                        variant='outlined'
                    >
                        {`${filterApplied ? 'Change' : 'Apply'} Filter`}
                    </Button>
                )}
            </div>
            <Grid
                entity={entity}
                fetch={fetch}
                onRowClick={onRowClick}
                options={options}
                tableRef={tableRef}
                title={title}
            />
        </div>
    );
}

AdministratorGrid.propTypes = {
    entity: PropTypes.string.isRequired,
    title: PropTypes.string,
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onImport: PropTypes.func,
    onExport: PropTypes.func,
    onFilter: PropTypes.func,
    options: PropTypes.object,
    importFileTypes: PropTypes.array,
    fetch: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    filterApplied: PropTypes.bool,
    tableRef: PropTypes.object,
};

AdministratorGrid.defaultProps = {
    title: '',
    onRowClick: undefined,
    onCreate: undefined,
    onImport: undefined,
    onExport: undefined,
    onFilter: undefined,
    filterApplied: false,
    fetch: undefined,
    importFileTypes: ['xlsx'],
    options: {},
    style: undefined,
    className: '',
    tableRef: undefined,
};

export default AdministratorGrid;
