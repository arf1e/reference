import { Box, styled } from '@mui/material';

export default styled(Box)<{ side: 'left' | 'right' }>`
  padding: 8px 12px;
  border-radius: 8px;
  border-bottom-left-radius: ${({ side }) => (side === 'left' ? 0 : '8px')};
  border-bottom-right-radius: ${({ side }) => (side === 'right' ? 0 : '8px')};
  background: linear-gradient(45deg, #2c95eb, #2ea1ff);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 200px;

  .author {
    margin-bottom: 4px;
  }

  .message {
    font-size: 12px;
  }

  .timestamp {
    text-align: right;
    align-self: flex-end;
    font-size: 0.6em;
    opacity: 0.8;
  }
`;
