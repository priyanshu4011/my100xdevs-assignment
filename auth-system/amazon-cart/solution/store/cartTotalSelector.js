import { selector } from 'recoil';
import { cartItemsState } from './cartItemsState';

export const cartTotalSelector = selector({
  key: 'cartTotalSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },
});