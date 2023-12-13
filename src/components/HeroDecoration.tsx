import { Box, Grow } from '@mui/material';
import { useEffect, useState } from 'react';
import Nerdface from '../styles/styled/Nerdface';
import MessageBubble from './MessageBubble';

const NERD_MESSAGES = [
  "You know there's a thing called a monad...",
  "I'm gonna use the Finite State pattern on this one.",
  "Oh so you've never heard of SICP...",
  'Bruh, do you even know what a lambda is?',
  "I'm thinking of creating a DSL for this specific problem.",
  'Do you think quantum computing will solve this faster?',
  'I once wrote an operating system in assembly, no big deal.',
  'You should refactor your code to adhere to the SOLID principles.',
  'I dream in code. Literally.',
  'Functional programming is more than just a paradigm; it’s a lifestyle.',
  'I prefer tabs over spaces, obviously for quantum reasons.',
  'I think you should use red-black trees for this.',
  'Do you even know where the Y-Combinator term comes from?',
  'I think you should use a Bloom filter for this.',
  'Have you ever read something by Knuth? Me neither.',
];

const SIDE_LEFT = 'left';
const SIDE_RIGHT = 'right';

type MessageTipSide = typeof SIDE_LEFT | typeof SIDE_RIGHT;

export default function HeroDecoration() {
  const [message, setMessage] = useState(
    NERD_MESSAGES[Math.floor(Math.random() * NERD_MESSAGES.length)]
  );
  const [shown, setShown] = useState(true);
  const [tipSide, setTipSide] = useState<MessageTipSide>(SIDE_LEFT);

  const switchSide = () => {
    setTipSide(tipSide === SIDE_LEFT ? SIDE_RIGHT : SIDE_LEFT);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShown(false);
      switchSide();
      setTimeout(() => {
        const currentIndex = NERD_MESSAGES.indexOf(message);
        const nextIndex = (currentIndex + 1) % NERD_MESSAGES.length;
        setShown(true);
        setMessage(NERD_MESSAGES[nextIndex]);
      }, 600); // transition time
    }, 5000); // how long each message is shown

    return () => clearInterval(interval);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grow in={tipSide === SIDE_RIGHT && shown}>
          <Box>
            <MessageBubble
              message={message}
              author="🤓"
              timestamp="now"
              tipSide="right"
            />
          </Box>
        </Grow>
      </Box>
      <Nerdface />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grow in={tipSide === SIDE_LEFT && shown}>
          <Box>
            <MessageBubble
              message={message}
              author="🤓"
              timestamp="now"
              tipSide="left"
            />
          </Box>
        </Grow>
      </Box>
    </Box>
  );
}
