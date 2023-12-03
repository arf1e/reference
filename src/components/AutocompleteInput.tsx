import { Box, Fade, TextField, TextFieldProps } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_URL } from '../config/api';
import useDebouncedValue from '../hooks/useDebouncedValue';
import AutocompleteSuggestion from './AutocompleteSuggestion';

type Props<Element, ResponseFormat> = {
  onChooseElement: (element: Element) => void;
  valueExtractor: (element: Element) => string;
  suggestionsExtractor: (res: ResponseFormat) => Element[];
  endpoint: string;
  param: string;
} & TextFieldProps;

const SUGGESTIONS_LIMIT = 3;

export default function AutocompleteInput<
  Element extends { _id: string },
  Res,
>({
  onChooseElement,
  valueExtractor,
  endpoint,
  param,
  suggestionsExtractor,
  ...textFieldProps
}: Props<Element, Res>) {
  const [inputValue, setInputValue] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [suggestions, setSuggestions] = useState<Element[]>([]);
  const query = useDebouncedValue(queryValue, 300);
  const url = useMemo(() => {
    const constructedUrl = new URL(endpoint, API_URL);
    constructedUrl.searchParams.set('limit', SUGGESTIONS_LIMIT.toString());
    return constructedUrl;
  }, [endpoint]);

  const getSuggestions = useCallback(
    async (url: URL) => {
      url.searchParams.set(param, query);
      const suggestions = await fetch(url)
        .then((res) => res.json())
        .then((res) => suggestionsExtractor(res));
      return suggestions;
    },
    [param, query, suggestionsExtractor]
  );

  useEffect(() => {
    if (query.length > 3) {
      url.searchParams.set(param, query);
      getSuggestions(url).then((suggestions) => {
        setSuggestions(suggestions);
      });
      return;
    }
    setSuggestions([]);
  }, [query, getSuggestions, url, param]);

  const handleChooseElement = (element: Element) => {
    setInputValue(valueExtractor(element));
    setSuggestions([]);
    onChooseElement(element);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setQueryValue(e.target.value);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', minWidth: '30%' }}>
      <TextField
        {...textFieldProps}
        value={inputValue}
        fullWidth
        onChange={handleInput}
        sx={{ position: 'relative' }}
      />

      <Fade in={suggestions.length > 0}>
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            width: '100%',
            zIndex: 2,
          }}
        >
          {suggestions.map((suggestion) => (
            <AutocompleteSuggestion
              key={suggestion._id}
              onClick={() => handleChooseElement(suggestion)}
              text={valueExtractor(suggestion)}
            />
          ))}
        </Box>
      </Fade>
    </Box>
  );
}
