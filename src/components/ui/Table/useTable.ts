import { useState, useMemo } from 'react';
import { EntityWithID } from '~/entities/shared';
import { TableProps } from './types';

export const useTable = <T extends EntityWithID>(props: TableProps<T>) => {
  const { data, columns, sortedCallback } = props;
  const [sortColumn, setSortColumn] = useState('');

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const column = columns.find(c => c.name === sortColumn);
      if (!column || !column.sortableContent) return 0;

      const { sortableContent, descending = false } = column;
      const inverter = descending ? -1 : 1;
      const valueA = sortableContent(a);
      const valueB = sortableContent(b);
      const result = valueA > valueB ? 1 : -1;
      return result * inverter;
    });
  }, [columns, sortColumn, data]);

  const onSort = (colName: string) => {
    setSortColumn(colName);
    sortedCallback && sortedCallback();
  };

  return { data: sortedData, columns, sortColumn, onSort };
};
