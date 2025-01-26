import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "utils/shopping-cart";
import { ROUTES } from "utils/Constants";
import "./CartButton.css";

const CartButton = () => {
  const navigate = useNavigate();
  const [cartContents, setCartContents] = useState(() => {
    console.log('CartButton: Initializing cart contents');
    return ShoppingCart.getCartContents();
  });

  useEffect(() => {
    console.log('CartButton: Setting up cart listener');
    const cartListener = {
      forceUpdate: () => {
        console.log('CartButton: Cart updated, refreshing');
        const contents = ShoppingCart.getCartContents();
        console.log('CartButton: New contents:', contents);
        setCartContents(contents);
      }
    };

    ShoppingCart.registerCartListener(cartListener);

    return () => {
      console.log('CartButton: Cleaning up listener');
      ShoppingCart.removeCartListener(cartListener);
    };
  }, []);

  const itemCount = Array.isArray(cartContents) ? cartContents.length : 0;

  return (
    <a 
      className="shopping_cart_link"
      href="#"
      onClick={(evt) => {
        evt.preventDefault();
        navigate(ROUTES.CART);
      }}
      data-test="shopping-cart-link"
    >
      {itemCount > 0 && (
        <span className="shopping_cart_badge" data-test="shopping-cart-badge">
          {itemCount}
        </span>
      )}
    </a>
  );
};

export default CartButton;