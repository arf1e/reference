import _ from 'lodash';
import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return handler.cancel;
  }, [value, delay]);

  return debouncedValue;
}
