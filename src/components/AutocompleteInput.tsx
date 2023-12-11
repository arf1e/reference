import {
  Box,
  CircularProgress,
  Collapse,
  Fade,
  ListItem,
  ListItemButton,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { API_URL } from '../config/api';
import useDebouncedValue from '../hooks/useDebouncedValue';
import AutocompleteSuggestionsContainer from '../styles/styled/AutocompleteSuggestionsContainer';
import { ApiResponse, WithPagination } from '../types/api';
import { AuthorType } from '../types/authors';
import { GenreType } from '../types/genres';
import {
  AuthorAutocompleteChip,
  GenreAutocompleteChip,
} from './AutocompleteChip';

type Props<Element extends { _id: string }, ResponseFormat> = {
  inputValue: string;
  onInputChange: (value: string) => void;
  selectedValues: string[];
  onChooseElement: (element: Element) => void;
  valueExtractor: (element: Element) => string;
  replace?: boolean;
  endpoint: string;
  queryParam: string;
  suggestionsExtractor: (response: ResponseFormat) => Element[];
  title: string;
  renderChip: (id: string) => ReactNode;
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
  title,
  valueExtractor,
  renderChip,
  replace = false,
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
            <Collapse key={value} orientation="horizontal">
              {renderChip(value)}
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
      <Box sx={{ mt: 1, position: 'relative', width: '100%' }}>
        {replace && selectedValues.length > 0 ? null : (
          <Fade in={true}>
            <TextField
              {...textFieldProps}
              value={inputValue}
              error={state === SUGGESTIONS_ERROR}
              onChange={(e) => onInputChange(e.target.value)}
              fullWidth
            />
          </Fade>
        )}
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
                disabled={_.includes(selectedValues, suggestion._id)}
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

type AutocompleteInputProps<Element extends { _id: string }, Response> = Omit<
  Props<Element, Response>,
  | 'endpoint'
  | 'valueExtractor'
  | 'queryParam'
  | 'suggestionsExtractor'
  | 'renderChip'
> & {
  onDeleteValue: (id: string) => void;
};

export function AuthorsAutocompleteInput(
  props: AutocompleteInputProps<
    AuthorType,
    ApiResponse<WithPagination<{ authors: AuthorType[] }>>
  >
) {
  return (
    <AutocompleteInput<
      AuthorType,
      ApiResponse<WithPagination<{ authors: AuthorType[] }>>
    >
      {..._.omit(props, ['onDeleteValue'])}
      endpoint="/authors"
      valueExtractor={(author) => author.name}
      queryParam="name"
      suggestionsExtractor={(res) => res.data.authors}
      renderChip={(id) => (
        <AuthorAutocompleteChip
          id={id}
          onDelete={() => props.onDeleteValue(id)}
        />
      )}
    />
  );
}

export function GenresAutocompleteInput(
  props: AutocompleteInputProps<
    GenreType,
    ApiResponse<WithPagination<{ genres: GenreType }>>
  >
) {
  return (
    <AutocompleteInput<
      GenreType,
      ApiResponse<WithPagination<{ genres: GenreType[] }>>
    >
      {..._.omit(props, ['onDeleteValue'])}
      endpoint="/genres"
      valueExtractor={(genre) => genre.title}
      queryParam="title"
      suggestionsExtractor={(res) => res.data.genres}
      renderChip={(id) => (
        <GenreAutocompleteChip
          id={id}
          onDelete={() => props.onDeleteValue(id)}
        />
      )}
    />
  );
}
