import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isProblemUser } from "utils/Credentials";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";
import "components/features/cart/CartItem.css";

interface CartItemData {
  id: number;
  name: string;
  desc: string;
  price: number;
}

interface CartItemProps {
  item?: CartItemData;
  showButton?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, showButton = false }) => {
  const navigate = useNavigate();
  const [itemVisible, setItemVisible] = useState(Boolean(item));

  useEffect(() => {
    setItemVisible(Boolean(item));
  }, [item]);

  const removeFromCart = (itemId: number) => {
    console.log('CartItem: Removing item:', itemId);
    ShoppingCart.removeItem(itemId);
    setItemVisible(false);
  };

  if (!itemVisible || !item) {
    return null;
  }

  const { id, name, desc, price } = item;
  let linkId = id;

  if (isProblemUser()) {
    linkId += 1;
  }

  const itemLink = `${ROUTES.INVENTORY_LIST}?id=${linkId}`;

  return (
    <div className="cart_item" data-test="inventory-item">
      <div className="cart_quantity" data-test="item-quantity">1</div>
      <div className="cart_item_label">
        <a href="#"
          id={`item_${id}_title_link`}
          onClick={(evt) => {
            evt.preventDefault();
            navigate(itemLink);
          }}
          data-test={`item-${id}-title-link`}
        >
          <div className="inventory_item_name" data-test="inventory-item-name">{name}</div>
        </a>
        <div className="inventory_item_desc" data-test="inventory-item-desc">{desc}</div>
        <div className="item_pricebar">
          <div className="inventory_item_price" data-test="inventory-item-price">${price}</div>
          {showButton && (
            <Button
              customClass="cart_button"
              label="Remove"
              testId={`remove-${name.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => removeFromCart(id)}
              size={BUTTON_SIZES.SMALL}
              type={BUTTON_TYPES.SECONDARY}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;