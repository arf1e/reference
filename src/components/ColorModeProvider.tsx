import { ReactNode, useState } from 'react';
import { ColorModeContext, ColorModeType } from '../hooks/useColorMode';

export default function ColorModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
