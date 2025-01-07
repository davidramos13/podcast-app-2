import tw, { styled } from 'twin.macro';
import {
  TableContainer,
  TableHead,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { unforward } from '~/utils/styling';
import { TableProps } from './types';
import SortHead from './SortHead';
import { useTable } from './useTable';
import { Fragment } from 'react';
import { IDType } from '~/store/types';

const StyledCell = styled(
  TableCell,
  unforward('hideShortDevice'),
)<{
  hideShortDevice?: boolean;
}>(({ hideShortDevice }) => [tw`border-b-light`, hideShortDevice && tw`hidden lg:table-cell`]);

const Table = <T extends IDType>(props: TableProps<T>) => {
  const { data, columns, sortColumn, onSort } = useTable(props);

  return (
    <Fragment>
      <SortHead columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableContainer>
        <MuiTable data-testid="table">
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
                {columns.map(col => {
                  const value = col.sortableContent ? col.sortableContent(item) : null;
                  return (
                    <StyledCell
                      key={col.name}
                      hideShortDevice={col.hideSmallDevice}
                      css={col.cellCss}
                      {...(col.sendDataProp ? { data } : {})}
                    >
                      {col.content ? col.content(item) : value}
                    </StyledCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Fragment>
  );
};

export default Table;
