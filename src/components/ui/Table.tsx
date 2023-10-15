import { ReactNode } from 'react';
import tw, { styled, TwStyle } from 'twin.macro';
import {
  TableContainer,
  TableHead,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

export type Column<T> = {
  name: string;
  content: (row: T, list?: T[]) => string | ReactNode;
  customHead?: ReactNode;
  sortable?: boolean;
  cellCss?: TwStyle;
  hideSmallDevice?: boolean;
};

type Props<T> = {
  idSelector: (row: T) => number;
  data: T[];
  columns: Column<T>[];
};

const StyledCell = styled(TableCell, { shouldForwardProp: prop => prop !== 'hideShortDevice' })<{
  hideShortDevice?: boolean;
}>(({ hideShortDevice }) => [hideShortDevice && tw`hidden lg:table-cell`]);

const Table = <T,>(props: Props<T>) => {
  const { data, columns, idSelector } = props;
  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <StyledCell key={col.name} hideShortDevice={col.hideSmallDevice}>
                {col.customHead || col.name}
              </StyledCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={idSelector(item)}>
              {columns.map(col => (
                <StyledCell key={col.name} hideShortDevice={col.hideSmallDevice} css={col.cellCss}>
                  {col.content(item, data)}
                </StyledCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
