import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isErrorUser, isProblemUser } from "utils/Credentials";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import { getProductById } from "utils/productService";
import CartItem from "components/features/cart/CartItem";
import SwagLabsFooter from "components/layout/Footer";
import HeaderContainer from "components/layout/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";
import "./CheckOutStepTwo.css";

interface CartItemData {
  id: string;
  name: string;
  desc: string;
  price: number;
}

const CheckOutStepTwo = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderTax, setOrderTax] = useState("0.00");
  const [finalTotal, setFinalTotal] = useState("0.00");

  useEffect(() => {
    // Load cart items from the API
    const loadCartItems = async () => {
      const cartItemIds = ShoppingCart.getCartContents();
      const itemPromises = cartItemIds.map(async (id) => {
        try {
          return await getProductById(id);
        } catch (error) {
          console.error(`Error fetching product with ID ${id}:`, error);
          return null;
        }
      });
      
      const fetchedItems = await Promise.all(itemPromises);
      const validItems = fetchedItems.filter(Boolean) as CartItemData[];
      
      setCartItems(validItems);
      
      // Calculate totals
      const total = validItems.reduce((sum, item) => {
        const price = item.price;
        const itemTotal = isProblemUser() ? price * 2 : price;
        return sum + itemTotal;
      }, 0);
      
      setOrderTotal(total);
      setOrderTax((total * 0.08).toFixed(2));
      setFinalTotal((total + (total * 0.08)).toFixed(2));
      
      setIsLoading(false);
    };
    
    loadCartItems();
  }, []);

  const clearCart = () => {
    if (isProblemUser()) {
      return;
    } else if (isErrorUser()) {
      ShoppingCart.resetCart();
      return;
    }
    ShoppingCart.resetCart();
  };

  const handleFinish = () => {
    clearCart();
    navigate(ROUTES.CHECKOUT_COMPLETE);
  };

  if (isLoading) {
    return (
      <div id="page_wrapper" className="page_wrapper">
        <div id="contents_wrapper">
          <HeaderContainer secondaryTitle="Checkout: Overview" />
          <div
            id="checkout_summary_container"
            className="checkout_summary_container"
            data-test="checkout-summary-container"
          >
            <div>Loading checkout details...</div>
          </div>
        </div>
        <SwagLabsFooter />
      </div>
    );
  }

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle="Checkout: Overview" />
        <div
          id="checkout_summary_container"
          className="checkout_summary_container"
          data-test="checkout-summary-container"
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
              {cartItems.map((item, i) => (
                <CartItem key={`${item.id}-${i}`} item={item} />
              ))}
            </div>
            <div className="summary_info">
              <div className="summary_info_label" data-test="payment-info-label">
                Payment Information:
              </div>
              <div className="summary_value_label" data-test="payment-info-value">
                SauceCard #31337
              </div>
              <div className="summary_info_label" data-test="shipping-info-label">
                Shipping Information:
              </div>
              <div className="summary_value_label" data-test="shipping-info-value">
                Free Pony Express Delivery!
              </div>
              <div className="summary_info_label" data-test="total-info-label">
                Price Total
              </div>
              <div className="summary_subtotal_label" data-test="subtotal-label">
                Item total: ${orderTotal.toFixed(2)}
              </div>
              <div className="summary_tax_label" data-test="tax-label">
                Tax: ${orderTax}
              </div>
              <div className="summary_total_label" data-test="total-label">
                Total: ${finalTotal}
              </div>
              <div className="cart_footer">
                <Button
                  customClass="cart_cancel_link"
                  label="Cancel"
                  onClick={() => navigate(ROUTES.INVENTORY)}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="cancel"
                  type={BUTTON_TYPES.BACK}
                />
                <Button
                  customClass="cart_button"
                  label="Finish"
                  onClick={handleFinish}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="finish"
                  type={BUTTON_TYPES.ACTION}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};

export default CheckOutStepTwo;