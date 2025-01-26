import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import CartItem from "components/features/cart/CartItem";
import SwagLabsFooter from "components/layout/Footer";
import HeaderContainer from "components/layout/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";
import "./Cart.css";
import { isVisualUser } from "utils/Credentials";

const Cart = () => {
  console.log('Cart component rendering');
  const navigate = useNavigate();
  const cartItemIds = ShoppingCart.getCartContents();
  console.log('Cart items:', cartItemIds);

  const buttonClass = `checkout_button ${
    isVisualUser() ? "btn_visual_failure" : ""
  }`;

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
              {cartItemIds.length > 0 && (
                <>
                  <div className="cart_quantity_label" data-test="cart-quantity-label">
                    QTY
                  </div>
                  <div className="cart_desc_label" data-test="cart-desc-label">
                    Description
                  </div>
                </>
              )}
              {cartItemIds.map((itemId, i) => (
                <CartItem 
                  key={`${itemId}-${i}`} 
                  item={{ id: itemId }} 
                  showButton 
                />
              ))}
              {cartItemIds.length === 0 && (
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
              {cartItemIds.length > 0 && (
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