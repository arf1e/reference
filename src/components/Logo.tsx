import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoContainer from '../styles/styled/LogoContainer';

export default function Logo() {
  return (
    <Link to="/">
      <LogoContainer>
        Reference<Typography className="decorative">*</Typography>
      </LogoContainer>
    </Link>
  );
}
