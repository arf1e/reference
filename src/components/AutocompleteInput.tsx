import {
  Box,
  Chip,
  CircularProgress,
  Collapse,
  ListItem,
  ListItemButton,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { API_URL } from '../config/api';
import useDebouncedValue from '../hooks/useDebouncedValue';
import AutocompleteSuggestionsContainer from '../styles/styled/AutocompleteSuggestionsContainer';
import { ApiResponse, WithPagination } from '../types/api';
import { AuthorType } from '../types/authors';
import { GenreType } from '../types/genres';

type Props<Element extends { _id: string }, ResponseFormat> = {
  inputValue: string;
  onInputChange: (value: string) => void;
  selectedValues: Element[];
  onChooseElement: (element: Element) => void;
  onDeleteValue: (element: Element) => void;
  valueExtractor: (element: Element) => string;
  endpoint: string;
  queryParam: string;
  suggestionsExtractor: (response: ResponseFormat) => Element[];
  title: string;
} & TextFieldProps;

const SUGGESTIONS_IDLE = 'SUGGESTIONS_IDLE';
const SUGGESTIONS_LOADING = 'SUGGESTIONS_LOADING';
const SUGGESTIONS_ERROR = 'SUGGESTIONS_ERROR';
const SUGGESTIONS_LIST = 'SUGGESTIONS_LIST';
const SUGGESTIONS_EMPTY = 'SUGGESTIONS_EMPTY';

const AUTOCOMPLETE_SUGGESTIONS_LIMIT = '3';
const MIN_QUERY_LENGTH = 2;

export type SuggestionsState =
  | typeof SUGGESTIONS_IDLE
  | typeof SUGGESTIONS_LOADING
  | typeof SUGGESTIONS_ERROR
  | typeof SUGGESTIONS_LIST
  | typeof SUGGESTIONS_EMPTY;

export default function AutocompleteInput<
  Entity extends { _id: string },
  Response,
>({
  inputValue,
  onInputChange,
  selectedValues,
  onChooseElement,
  suggestionsExtractor,
  endpoint,
  queryParam,
  onDeleteValue,
  title,
  valueExtractor,
  ...textFieldProps
}: Props<Entity, Response>) {
  const [query, resetQuery] = useDebouncedValue(inputValue, 300);
  const [suggestions, setSuggestions] = useState<Entity[]>([]);
  const [state, setState] = useState<SuggestionsState>(SUGGESTIONS_IDLE);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setState(SUGGESTIONS_LOADING);
      try {
        const url = new URL(`${API_URL}${endpoint}`);
        url.searchParams.set(queryParam, query);
        url.searchParams.set('limit', AUTOCOMPLETE_SUGGESTIONS_LIMIT);
        const response = await fetch(url.toString());
        const json = await response.json();
        const suggestions = suggestionsExtractor(json);
        setSuggestions(suggestions);
        setState(
          suggestions.length === 0 ? SUGGESTIONS_EMPTY : SUGGESTIONS_LIST
        );
        return;
      } catch (error) {
        setSuggestions([]);
        setState(SUGGESTIONS_ERROR);
      }
    };

    if (query.length > MIN_QUERY_LENGTH) {
      fetchSuggestions();
      return;
    }

    setSuggestions([]);
    setState(SUGGESTIONS_IDLE);
  }, [query]);

  const handleSelectSuggestion = (suggestion: Entity) => {
    onInputChange('');
    resetQuery('');
    onChooseElement(suggestion);
    setSuggestions([]);
    setState(SUGGESTIONS_IDLE);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          gap: selectedValues.length > 0 ? 1 : 0,
          my: selectedValues.length > 0 ? 1 : 0,
        }}
      >
        <TransitionGroup component={null}>
          {selectedValues.map((value) => (
            <Collapse key={value._id} orientation="horizontal">
              <Chip
                key={value._id}
                label={valueExtractor(value)}
                variant="outlined"
                onDelete={() => onDeleteValue(value)}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
      <Box sx={{ mt: 1, position: 'relative', width: '100%' }}>
        <TextField
          {...textFieldProps}
          value={inputValue}
          error={state === SUGGESTIONS_ERROR}
          onChange={(e) => onInputChange(e.target.value)}
          sx={{ mt: 1 }}
          fullWidth
        />
        {state === SUGGESTIONS_LOADING && (
          <AutocompleteSuggestionsContainer>
            <ListItem>
              <CircularProgress size={14} />
            </ListItem>
          </AutocompleteSuggestionsContainer>
        )}
        {state === SUGGESTIONS_LIST && (
          <AutocompleteSuggestionsContainer>
            {suggestions.map((suggestion) => (
              <ListItemButton
                key={suggestion._id}
                disabled={_.includes(
                  selectedValues.map((elt) => elt._id),
                  suggestion._id
                )}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                <Typography variant="body2">
                  {valueExtractor(suggestion)}
                </Typography>
              </ListItemButton>
            ))}
          </AutocompleteSuggestionsContainer>
        )}
        {state === SUGGESTIONS_EMPTY && (
          <AutocompleteSuggestionsContainer>
            <ListItem>
              <Typography variant="body2">No results</Typography>
            </ListItem>
          </AutocompleteSuggestionsContainer>
        )}
      </Box>
    </Box>
  );
}

export const AuthorsAutocomplete = AutocompleteInput<
  AuthorType,
  ApiResponse<WithPagination<{ authors: AuthorType[] }>>
>;

export const GenresAutocomplete = AutocompleteInput<
  GenreType,
  ApiResponse<WithPagination<{ genres: GenreType[] }>>
>;
