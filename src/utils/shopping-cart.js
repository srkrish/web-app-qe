export class ShoppingCart {
  static LISTENERS = [];

  static addItem(itemId) {
    console.log('Adding item to cart:', itemId);
    const curContents = ShoppingCart.getCartContents();
    console.log('Current contents before add:', curContents);

    if (curContents.indexOf(itemId) < 0) {
      curContents.push(itemId);
      console.log('New contents after add:', curContents);
      ShoppingCart.setCartContents(curContents);
    }
  }

  static removeItem(itemId) {
    console.log('ShoppingCart: Removing item:', itemId);
    const curContents = ShoppingCart.getCartContents();
    // Filter out the item with matching id
    const updatedContents = curContents.filter(item => 
      typeof item === 'object' ? item.id !== itemId : item !== itemId
    );
    
    console.log('ShoppingCart: Updated contents:', updatedContents);
    ShoppingCart.setCartContents(updatedContents);
    
    // Ensure listeners are notified
    ShoppingCart.LISTENERS.forEach(listener => {
      if (listener && typeof listener.forceUpdate === 'function') {
        listener.forceUpdate();
      }
    });
  }

  static isItemInCart(itemId) {
    const curContents = ShoppingCart.getCartContents();
    const isIn = curContents.indexOf(itemId) >= 0;
    console.log('Checking if item in cart:', itemId, isIn);
    return isIn;
  }

  static getCartContents() {
    let curContents = window.localStorage.getItem("cart-contents");
    console.log('Raw cart contents from storage:', curContents);

    if (curContents == null) {
      curContents = [];
    } else {
      curContents = JSON.parse(curContents);
    }
    console.log('Parsed cart contents:', curContents);
    return curContents;
  }

  static setCartContents(newContents) {
    console.log('Setting cart contents:', newContents);
    window.localStorage.setItem("cart-contents", JSON.stringify(newContents));
    ShoppingCart.notifyListeners();
  }

  static resetCart() {
    console.log('Resetting cart');
    window.localStorage.removeItem("cart-contents");
    ShoppingCart.notifyListeners();
  }

  static notifyListeners() {
    console.log('Notifying listeners:', ShoppingCart.LISTENERS.length);
    ShoppingCart.LISTENERS.forEach((listener) => {
      if (listener && typeof listener.forceUpdate === 'function') {
        listener.forceUpdate();
      }
    });
  }

  static registerCartListener(handler) {
    console.log('Registering cart listener');
    if (handler && typeof handler.forceUpdate === 'function') {
      ShoppingCart.LISTENERS.push(handler);
    }
  }

  static removeCartListener(handler) {
    console.log('Removing cart listener');
    ShoppingCart.LISTENERS = ShoppingCart.LISTENERS.filter(
      (listener) => listener !== handler
    );
  }
}