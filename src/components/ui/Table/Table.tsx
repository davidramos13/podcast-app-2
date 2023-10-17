import tw, { styled } from 'twin.macro';
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
import { unforward } from '~/utils/styling';
import { TableProps } from './types';
import SortHead from './SortHead';
import { useTable } from './useTable';

const StyledCell = styled(
  TableCell,
  unforward('hideShortDevice'),
)<{
  hideShortDevice?: boolean;
}>(({ hideShortDevice }) => [tw`border-b-light`, hideShortDevice && tw`hidden lg:table-cell`]);

const Table = <T extends EntityWithID>(props: TableProps<T>) => {
  const { data, columns, sortColumn, onSort } = useTable(props);

  return (
    <TableContext.Provider value={data}>
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
    </TableContext.Provider>
  );
};

export default Table;
