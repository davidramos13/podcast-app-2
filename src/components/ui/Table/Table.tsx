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
import { EntityWithID } from '~/entities/shared';
import { TableContext } from './useTableContext';

export type Column<T extends EntityWithID> = {
  name: string;
  content: (row: T) => string | ReactNode;
  customHead?: ReactNode;
  sortable?: boolean;
  cellCss?: TwStyle;
  hideSmallDevice?: boolean;
};

type Props<T extends EntityWithID> = {
  data: T[];
  columns: Column<T>[];
};

const StyledCell = styled(TableCell, { shouldForwardProp: prop => prop !== 'hideShortDevice' })<{
  hideShortDevice?: boolean;
}>(({ hideShortDevice }) => [hideShortDevice && tw`hidden lg:table-cell`]);

const Table = <T extends EntityWithID>(props: Props<T>) => {
  const { data, columns } = props;
  return (
    <TableContext.Provider value={data}>
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
              <TableRow key={item.id}>
                {columns.map(col => (
                  <StyledCell
                    key={col.name}
                    hideShortDevice={col.hideSmallDevice}
                    css={col.cellCss}
                  >
                    {col.content(item)}
                  </StyledCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </TableContext.Provider>
  );
};

export default Table;
