import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SearchIcon from '@mui/icons-material/Search';
import tw from 'twin.macro';
import { SortHeadProps } from './types';
import { IDType } from '~/store/types';

const DivContainer = tw.div`py-2.5 h-[60px] flex gap-2 justify-end items-center`;
const TwInputBase = tw(InputBase)`w-32 h-10 items-center text-white`;

const SortHead = <T extends IDType>(props: SortHeadProps<T>) => {
  const { columns, onSort, sortColumn } = props;
  const colNames = columns.filter(c => c.sortableContent).map(c => c.name);

  const onSelect = (e: SelectChangeEvent) => {
    onSort(e.target.value);
  };

  return (
    <DivContainer>
      <SearchIcon tw="text-xl text-white" />
      <FormControl size="small">
        <InputLabel id="lblOrderBy">Order by</InputLabel>
        <Select
          labelId="lblOrderBy"
          value={sortColumn}
          variant="outlined"
          label="Order by"
          onChange={onSelect}
          input={<TwInputBase />}
          IconComponent={ExpandMoreRoundedIcon}
        >
          <MenuItem value="">
            <em>Initial</em>
          </MenuItem>
          {colNames.map(colName => (
            <MenuItem key={colName} value={colName}>
              {colName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DivContainer>
  );
};

export default SortHead;
