import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isProblemUser } from "utils/Credentials";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import { getProductById } from "utils/productService";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";
import "components/features/cart/CartItem.css";

interface CartItemData {
  id: string;
  name: string;
  desc: string;
  price: number;
}

interface CartItemProps {
  item?: CartItemData | string;
  showButton?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, showButton = false }) => {
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
          console.error(`Error fetching product with ID ${item}:`, error);
          setItemData(null);
        });
    } else if (item) {
      setItemData(item);
    }
  }, [item]);

  const removeFromCart = (itemId: string) => {
    console.log('CartItem: Removing item:', itemId);
    // Convert to number if ShoppingCart.removeItem expects a number
    ShoppingCart.removeItem(itemId);
    setItemVisible(false);
  };

  if (!itemVisible || !itemData) {
    return null;
  }

  const { id, name, desc, price } = itemData;
  let linkId = id;

  if (isProblemUser()) {
    // Handle problem user case for string IDs if needed
    // This may need additional logic for UUID strings
  }

  const itemLink = `${ROUTES.INVENTORY_LIST}?id=${linkId}`;
  const testId = name ? `remove-${name.replace(/\s+/g, "-").toLowerCase()}` : `remove-${id}`;

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
              testId={testId}
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