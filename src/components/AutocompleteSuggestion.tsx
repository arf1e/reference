import SuggestionContainer from '../styles/styled/SuggestionContainer';

type Props = {
  onClick: (element: unknown) => void;
  text: string;
};

export default function AutocompleteSuggestion({ onClick, text }: Props) {
  return (
    <SuggestionContainer onClick={onClick} component="button">
      {text}
    </SuggestionContainer>
  );
}
