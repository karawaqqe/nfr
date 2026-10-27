import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export function useShop() { // Один хук для доступа к состоянию магазина.
  const shop = useContext(ShopContext);
  if (!shop) throw new Error('useShop должен использоваться внутри ShopProvider');
  return shop;
}
