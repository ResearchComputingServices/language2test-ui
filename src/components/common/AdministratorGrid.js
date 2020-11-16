import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DownloadIcon from '@material-ui/icons/GetApp';
import UploadIcon from '@material-ui/icons/Publish';
import { FileUploader, Button, Grid } from '.';

function AdministratorGrid({
    className,
    style,
    title,
    onRowClick,
    onCreate,
    onImport,
    onExport,
    entity,
    options,
    fetch,
    importFileTypes,
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
    const tableRef = React.createRef(null);
    return (
        <div
            className={`administrator-grids ${className}`}
            style={style}
        >
            <div className='d-flex direction-row mb-4'>
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
    options: PropTypes.object,
    importFileTypes: PropTypes.array,
    fetch: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
};

AdministratorGrid.defaultProps = {
    title: '',
    onRowClick: undefined,
    onCreate: undefined,
    onImport: undefined,
    onExport: undefined,
    fetch: undefined,
    importFileTypes: ['xlsx'],
    options: {},
    style: undefined,
    className: '',
};

export default AdministratorGrid;
