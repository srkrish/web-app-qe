import { CartListener } from './types';

interface CartItem {
  id: string;
}

export class ShoppingCart {
  private static LISTENERS: CartListener[] = [];

  static addItem(itemId: string): void {
    console.log('Adding item to cart:', itemId);
    const curContents = ShoppingCart.getCartContents();
    console.log('Current contents before add:', curContents);

    if (!curContents.includes(itemId)) {
      curContents.push(itemId);
      console.log('New contents after add:', curContents);
      ShoppingCart.setCartContents(curContents);
    }
  }

  static removeItem(itemId: string): void {
    console.log('ShoppingCart: Removing item:', itemId);
    const curContents = ShoppingCart.getCartContents();
    const updatedContents = curContents.filter(item => 
      typeof item === 'object' && 'id' in item ? (item as CartItem).id !== itemId : item !== itemId
    );
    
    console.log('ShoppingCart: Updated contents:', updatedContents);
    ShoppingCart.setCartContents(updatedContents);
    
    ShoppingCart.notifyListeners();
  }

  static isItemInCart(itemId: string): boolean {
    const curContents = ShoppingCart.getCartContents();
    const isIn = curContents.includes(itemId);
    console.log('Checking if item in cart:', itemId, isIn);
    return isIn;
  }

  static getCartContents(): string[] {
    const curContents = window.localStorage.getItem("cart-contents");
    console.log('Raw cart contents from storage:', curContents);

    if (!curContents) {
      return [];
    }

    try {
      const parsed = JSON.parse(curContents);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing cart contents:', e);
      return [];
    }
  }

  static setCartContents(newContents: string[]): void {
    console.log('Setting cart contents:', newContents);
    window.localStorage.setItem("cart-contents", JSON.stringify(newContents));
    ShoppingCart.notifyListeners();
  }

  static resetCart(): void {
    console.log('Resetting cart');
    window.localStorage.removeItem("cart-contents");
    ShoppingCart.notifyListeners();
  }

  static notifyListeners(): void {
    console.log('Notifying listeners:', ShoppingCart.LISTENERS.length);
    ShoppingCart.LISTENERS.forEach((listener) => {
      if (listener && typeof listener.forceUpdate === 'function') {
        listener.forceUpdate();
      }
    });
  }

  static registerCartListener(handler: CartListener): void {
    console.log('Registering cart listener');
    if (handler && typeof handler.forceUpdate === 'function') {
      ShoppingCart.LISTENERS.push(handler);
    }
  }

  static removeCartListener(handler: CartListener): void {
    console.log('Removing cart listener');
    ShoppingCart.LISTENERS = ShoppingCart.LISTENERS.filter(
      (listener) => listener !== handler
    );
  }
}