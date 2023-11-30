import { Box, styled } from '@mui/material';

export default styled(Box)`
  @property --gradient-border {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }

  display: inline-flex;
  transition: --gradient-border 0.3s;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
  background: ${({ theme }) => {
    const bgColor = theme.palette.getContrastText(
      theme.palette.background.paper
    );
    return `linear-gradient(to top, ${bgColor} 0% var(--gradient-border), transparent var(--gradient-border) 100%)`;
  }};

  .decorative {
    color: ${({ theme }) => theme.palette.primary.main};
    display: inline-flex;
    transition: 0.3s;
  }

  &:hover {
    --gradient-border: 100%;
    outline: none;
    color: ${({ theme }) => theme.palette.background.paper};
    .decorative {
      color: ${({ theme }) =>
        theme.palette.getContrastText(theme.palette.background.paper)};
      transform: scale(2) translateX(5px) translateY(-5px) rotate(15deg);
    }
  }

  &:active {
    --gradient-border: 90%;
    .decorative {
      transform: scale(1.8) translateX(5px) translateY(-5px) rotate(10deg);
    }
  }
`;
