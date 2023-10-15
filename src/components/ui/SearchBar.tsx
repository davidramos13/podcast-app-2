import tw from 'twin.macro';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { ChangeEventHandler, FC } from 'react';

const DivContainer = tw.div`w-full gap-4 pl-5 pr-[5px] flex items-center rounded-[15px] bg-bgGray`;
const TwSearchIcon = tw(SearchIcon)`w-5 h-5`;
const SearchInput = tw(InputBase)`h-[50px] w-full`;

type Props = { filter: string; setFilter: (value: string) => void };
const SearchBar: FC<Props> = ({ filter, setFilter }) => {
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <DivContainer>
      <TwSearchIcon />
      <SearchInput
        value={filter}
        onChange={onChangeHandler}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </DivContainer>
  );
};

export default SearchBar;
