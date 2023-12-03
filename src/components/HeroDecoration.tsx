import { Box, Grow } from '@mui/material';
import { useEffect, useState } from 'react';
import Nerdface from '../styles/styled/Nerdface';
import MessageBubble from './MessageBubble';

const NERD_MESSAGES = [
  "You know there's a thing called a monad...",
  "I'm gonna use the Finite State pattern on this one.",
  "Oh so you've never heard of SICP...",
  'I think you should use red-black trees for this.',
  'Do you even know where the Y-Combinator term comes from?',
];

export default function HeroDecoration() {
  const [message, setMessage] = useState(NERD_MESSAGES[0]);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShown(false);
      setTimeout(() => {
        const currentIndex = NERD_MESSAGES.indexOf(message);
        const nextIndex = (currentIndex + 1) % NERD_MESSAGES.length;
        setShown(true);
        setMessage(NERD_MESSAGES[nextIndex]);
      }, 1000);
    }, 6000);

    return () => clearInterval(interval);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grow in={shown}>
          <Box>
            <MessageBubble
              message={message}
              author="🤓"
              timestamp="now"
              side="right"
            />
          </Box>
        </Grow>
      </Box>
      <Nerdface />
    </Box>
  );
}
