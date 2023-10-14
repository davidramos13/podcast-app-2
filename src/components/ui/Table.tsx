import {
  TableContainer,
  TableHead,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { ReactNode } from 'react';

export type Column<T> = {
  name: string;
  content: (row: T) => string | ReactNode;
  customHead?: ReactNode;
  sortable?: boolean;
};

type Props<T> = {
  idSelector: (row: T) => number;
  data: T[];
  columns: Column<T>[];
};

const Table = <T,>(props: Props<T>) => {
  const { data, columns, idSelector } = props;
  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell key={col.name}>{col.customHead || col.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={idSelector(item)}>
              {columns.map(col => (
                <TableCell key={col.name}>{col.content(item)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
