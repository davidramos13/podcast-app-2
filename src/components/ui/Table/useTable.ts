import { useMemo, useState } from 'react';
import { Column, TableProps } from './types';
import { IDType } from '~/store/types';

const sortData = <T extends IDType>(data: T[], columns: Column<T>[], sortColumn: string): T[] => {
  if (!sortColumn) return data;
  const sortedData = [...data].sort((a, b) => {
    const column = columns.find(c => c.name === sortColumn);
    if (!column || !column.sortableContent) return 0;

    const { sortableContent, descending = false } = column;
    const inverter = descending ? -1 : 1;
    const valueA = sortableContent(a);
    const valueB = sortableContent(b);
    const result = valueA > valueB ? 1 : -1;
    return result * inverter;
  });
  return sortedData;
};

export const useTable = <T extends IDType>(props: TableProps<T>) => {
  const { data: initialData, columns, sortedCallback } = props;
  const [sortColumn, setSortColumn] = useState('');

  const data = useMemo(() => {
    if (sortedCallback) return initialData;
    return sortData(initialData, columns, sortColumn);
  }, [columns, initialData, sortColumn, sortedCallback]);

  const onSort = (colName: string) => {
    setSortColumn(colName);
    const sortedDataArg = sortData(initialData, columns, colName);
    sortedCallback && sortedCallback(sortedDataArg);
  };

  return { data, columns, sortColumn, onSort };
};
