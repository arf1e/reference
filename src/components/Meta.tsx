import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import Helmet from 'react-helmet';

type Props = {
  pageTitle?: string;
};

export default function Meta({ pageTitle }: Props) {
  const {
    palette: { mode },
  } = useTheme();

  const href = useMemo(
    () => (mode === 'dark' ? '/favicon_black.ico' : '/favicon.ico'),
    [mode]
  );

  return (
    <Helmet>
      <title>{pageTitle ? `${pageTitle} | ` : ''}Reference*</title>
      <link rel="icon" href={href} />
    </Helmet>
  );
}
