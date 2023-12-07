import { ReactNode, useState } from 'react';
import { CartOverlayContext } from '../hooks/useCartOverlay';

export default function CartOverlayContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isShown, setIsShown] = useState(false);
  return (
    <CartOverlayContext.Provider value={{ isShown, setIsShown }}>
      {children}
    </CartOverlayContext.Provider>
  );
}
