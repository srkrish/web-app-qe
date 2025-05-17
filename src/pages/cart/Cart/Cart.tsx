import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import { getProductById, type MappedProduct } from "utils/productService";
import CartItem from "components/features/cart/CartItem";
import SwagLabsFooter from "components/layout/Footer";
import HeaderContainer from "components/layout/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";
import "./Cart.css";
import { isVisualUser } from "utils/Credentials";

type CartItemData = MappedProduct;

const Cart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  
  useEffect(() => {
    const loadCartItems = async () => {
      const cartItemIds = ShoppingCart.getCartContents();
      const itemPromises = cartItemIds.map(async (id) => {
        try {
          // Ensure id is passed as string to getProductById
          return await getProductById(id.toString());
        } catch (error) {
          console.error(`Error fetching product with ID ${id}:`, error);
          return null;
        }
      });
      
      const fetchedItems = await Promise.all(itemPromises);
      setCartItems(fetchedItems.filter(Boolean) as CartItemData[]);
      setIsLoading(false);
    };
    
    loadCartItems();
  }, []);

  const buttonClass = `checkout_button ${
    isVisualUser() ? "btn_visual_failure" : ""
  }`;

  if (isLoading) {
    return (
      <div id="page_wrapper" className="page_wrapper">
        <div id="contents_wrapper">
          <HeaderContainer secondaryTitle="Your Cart" />
          <div
            id="cart_contents_container"
            className="cart_contents_container"
            data-test="cart-contents-container"
          >
            <div>Loading cart items...</div>
          </div>
        </div>
        <SwagLabsFooter />
      </div>
    );
  }

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle="Your Cart" />
        <div
          id="cart_contents_container"
          className="cart_contents_container"
          data-test="cart-contents-container"
        >
          <div>
            <div className="cart_list" data-test="cart-list">
              {cartItems.length > 0 && (
                <>
                  <div className="cart_quantity_label" data-test="cart-quantity-label">
                    QTY
                  </div>
                  <div className="cart_desc_label" data-test="cart-desc-label">
                    Description
                  </div>
                </>
              )}
              {cartItems.map((item, i) => item && (
                <CartItem 
                  key={`${item.id}-${i}`} 
                  item={item} 
                  showButton 
                />
              ))}
              {cartItems.length === 0 && (
                <div className="cart_empty">Your cart is empty</div>
              )}
            </div>
            <div className="cart_footer">
              <Button
                label="Continue Shopping"
                onClick={() => navigate(ROUTES.INVENTORY)}
                size={BUTTON_SIZES.MEDIUM}
                testId="continue-shopping"
                type={BUTTON_TYPES.BACK}
              />
              {cartItems.length > 0 && (
                <Button
                  label="Checkout"
                  customClass={buttonClass}
                  onClick={() => navigate(ROUTES.CHECKOUT_STEP_ONE)}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="checkout"
                  type={BUTTON_TYPES.ACTION}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};

export default Cart;