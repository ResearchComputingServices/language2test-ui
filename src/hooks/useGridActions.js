import _ from 'lodash';
import { ToastsStore } from 'react-toasts';
import FileSaver from 'file-saver';
import usePluralize from './usePluralize';
import useService from './useService';

export default function useGridActions(entity, options = {}) {
    let { locale } = options;
    const { import: importCallback, export: exportCallback } = options;
    if (_.isNil(locale)) {
        locale = _.startCase(entity);
    }
    const [service, historyService] = useService(entity, 'history');
    const pluralize = usePluralize();

    const singular = _.kebabCase(pluralize.singular(entity));
    const plural = _.kebabCase(entity);

    const onCreate = () => historyService.go(`/admin/${plural}/${singular}`);

    const onRowClick = (event, row) => historyService.go(`/admin/${plural}/${singular}/${row.id}`);

    const onImport = async data => {
        try {
            const response = await service.import(data);
            if (_.isFunction(importCallback)) {
                return await importCallback(response);
            }
            ToastsStore.success(`Successfully imported ${locale}`);
        } catch (err) {
            ToastsStore.error(`Failed to import ${locale}`);
        }
    };

    const onExport = async () => {
        try {
            const file = await service.export();
            if (_.isFunction(exportCallback)) {
                await exportCallback(file);
                return ToastsStore.success(`Successfully exported ${locale}`);
            }
            const blob = new Blob(
                [file],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            );
            FileSaver.saveAs(blob, '.xlsx');
            ToastsStore.success(`Successfully exported ${locale}`);
        } catch (err) {
            ToastsStore.error(`Failed to export ${locale}`);
        }
    };

    return {
        onCreate,
        onRowClick,
        onImport,
        onExport,
    };
}
