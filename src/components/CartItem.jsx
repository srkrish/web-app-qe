import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isProblemUser } from "../utils/Credentials";
import { ROUTES } from "../utils/Constants";
import { ShoppingCart } from "../utils/shopping-cart";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "./Button";
import "./CartItem.css";

const CartItem = ({ item, showButton }) => {
  console.log('CartItem rendering', { item });
  const navigate = useNavigate();
  const [itemVisible, setItemVisible] = useState(Boolean(item));

  useEffect(() => {
    setItemVisible(Boolean(item));
  }, [item]);

  const removeFromCart = (itemId) => {
    console.log('CartItem: Removing item:', itemId);
    ShoppingCart.removeItem(itemId);
    // After removing, force a refresh of the cart display
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

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  showButton: PropTypes.bool,
};

CartItem.defaultProps = {
  item: undefined,
  showButton: false,
};

export default CartItem;