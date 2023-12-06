import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type ColorModeType = 'light' | 'dark';

export const ColorModeContext = createContext<{
  colorMode: ColorModeType;
  setColorMode: Dispatch<SetStateAction<ColorModeType>>;
}>({
  colorMode: 'light',
  setColorMode: () => {},
});

export default function useColorMode() {
  const { colorMode, setColorMode } = useContext(ColorModeContext);

  return {
    colorMode,
    setColorMode,
  };
}
