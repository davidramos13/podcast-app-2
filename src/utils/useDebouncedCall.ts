import debounce from 'lodash.debounce';
import { useCallback } from 'react';

const DELAY = 500;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebouncedCall = <T extends (...args: any) => void>(func: T) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- false positive from eslint
  const debounceCallback = useCallback(debounce(func, DELAY), []);
  return debounceCallback;
};

export default useDebouncedCall;
