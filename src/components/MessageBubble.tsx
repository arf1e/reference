import { Typography } from '@mui/material';
import MessageBubbleContainer from '../styles/styled/MessageBubbleContainer';

type Props = {
  message: string;
  author: string;
  timestamp: string;
  side?: 'left' | 'right';
};

export default function MessageBubble({
  message,
  author,
  timestamp,
  side = 'left',
}: Props) {
  return (
    <MessageBubbleContainer side={side}>
      <Typography variant="body2" className="author">
        {author}
      </Typography>
      <Typography variant="body2" className="message">
        {message}
      </Typography>
      <Typography variant="caption" className="timestamp">
        {timestamp}
      </Typography>
    </MessageBubbleContainer>
  );
}
