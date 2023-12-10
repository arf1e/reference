import _ from 'lodash';
import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(
  value: T,
  delay: number
): [T, (resetValue: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const resetQuery = (resetValue: T) => setDebouncedValue(resetValue);

  useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return handler.cancel;
  }, [value, delay]);

  return [debouncedValue, resetQuery];
}
