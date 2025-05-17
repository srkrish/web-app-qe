import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import { getProductById, type MappedProduct } from "utils/productService";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";
import "./CartItem.css";

type CartItemData = MappedProduct;

interface CartItemProps {
  item: string | CartItemData;
  showButton?: boolean;
}

const CartItem: FC<CartItemProps> = ({ 
  item, 
  showButton = false 
}) => {
  const navigate = useNavigate();
  const [itemVisible, setItemVisible] = useState(Boolean(item));
  const [itemData, setItemData] = useState<CartItemData | null>(null);

  useEffect(() => {
    setItemVisible(Boolean(item));
    if (typeof item === 'string') {
      getProductById(item)
        .then((product) => {
          setItemData(product);
        })
        .catch((error) => {
          console.error('Error loading cart item:', error);
          setItemVisible(false);
        });
    } else {
      setItemData(item);
    }
  }, [item]);

  if (!itemVisible || !itemData) {
    return null;
  }

  const { id, name, desc, price } = itemData;
  const removeFromCart = (itemId: string) => {
    ShoppingCart.removeItem(itemId);
    setItemVisible(false);
  };

  const linkId = typeof item === 'string' ? item : id;
  const itemLink = `${ROUTES.INVENTORY_LIST}?id=${linkId}`;

  return (
    <div className="cart_item" data-test="cart-item">
      <div className="cart_quantity" />
      <div className="cart_item_label">
        <a
          href="#"
          id={id}
          className="inventory_item_name"
          onClick={() => navigate(itemLink)}
          data-test="cart-item-link"
        >
          {name}
        </a>
        <div className="inventory_item_desc">{desc}</div>
        <div className="item_pricebar">
          <div className="inventory_item_price">${price}</div>
          {showButton && (
            <Button
              customClass="cart_button"
              label="Remove"
              onClick={() => removeFromCart(id)}
              size={BUTTON_SIZES.SMALL}
              testId={`remove-${name.replace(/\s+/g, "-").toLowerCase()}`}
              type={BUTTON_TYPES.SECONDARY}
            />
          )}
        </div>
      </div>
    </div>
  );
};

CartItem.displayName = 'CartItem';

export default CartItem;