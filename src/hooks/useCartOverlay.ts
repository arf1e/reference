import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export const CartOverlayContext = createContext<{
  isShown: boolean;
  setIsShown: Dispatch<SetStateAction<boolean>>;
}>({ isShown: false, setIsShown: () => {} });

export default function useCartOverlay() {
  const { isShown, setIsShown } = useContext(CartOverlayContext);

  const showCartOverlay = () => {
    setIsShown(true);
    document.body.style.overflowY = 'hidden';
  };
  const hideCartOverlay = () => {
    setIsShown(false);
    document.body.style.overflowY = 'auto';
  };

  return {
    isShown,
    showCartOverlay,
    hideCartOverlay,
  };
}
