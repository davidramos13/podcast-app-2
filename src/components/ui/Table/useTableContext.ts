import { Context, createContext, useContext } from 'react';

export const createTableContext = <T>() => createContext<T[]>([]);
export const TableContext = createTableContext();
const useTableContext = <T>() => useContext(TableContext as unknown as Context<T[]>);

export default useTableContext;
