import tw from 'twin.macro';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { ChangeEventHandler } from 'react';

const InputContainer = tw.div`w-full gap-4 pl-5 pr-[5px] flex items-center rounded-[15px] bg-bgGray hover:bg-hoverGray`;
const TwSearchIcon = tw(SearchIcon)`w-5 h-5`;
const SearchInput = tw(InputBase)`w-full`;

type Props = { placeholder?: string; filter: string; setFilter: (value: string) => void };

function SearchBar({ filter, setFilter }: Props) {
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <InputContainer>
      <TwSearchIcon />
      <SearchInput
        value={filter}
        onChange={onChangeHandler}
        placeholder="Search…"
        inputProps={{ ['data-testid']: 'search-input' }}
      />
    </InputContainer>
  );
}

export default SearchBar;
