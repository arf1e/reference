import useColorMode from '../hooks/useColorMode';
import MaterialUISwitch from '../styles/styled/MaterialUISwitch';

export default function ThemeSwitch() {
  const { colorMode, setColorMode } = useColorMode();
  const handleSwitch = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };
  return (
    <MaterialUISwitch checked={colorMode === 'dark'} onChange={handleSwitch} />
  );
}
