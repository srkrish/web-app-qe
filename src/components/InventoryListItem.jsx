import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ShoppingCart } from "../utils/shopping-cart";
import { isErrorUser, isProblemUser } from "../utils/Credentials";
import "./InventoryListItem.css";
import { ROUTES } from "../utils/Constants";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "./Button";

// Move ButtonType outside the component
const ButtonType = memo(({ id, item, itemInCart, missAlignButton, onAdd, onRemove }) => {
  const label = itemInCart ? "Remove" : "Add to cart";
  const onClick = itemInCart ? () => onRemove(id) : () => onAdd(id);
  const type = itemInCart ? BUTTON_TYPES.SECONDARY : BUTTON_TYPES.PRIMARY;
  const testId = `${label}-${item}`.replace(/\s+/g, "-").toLowerCase();
  const buttonClass = `btn_inventory ${
    missAlignButton ? "btn_inventory_misaligned" : ""
  }`;
  
  return (
    <Button
      customClass={buttonClass}
      label={label}
      onClick={onClick}
      size={BUTTON_SIZES.SMALL}
      testId={testId}
      type={type}
    />
  );
});

ButtonType.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  itemInCart: PropTypes.bool.isRequired,
  missAlignButton: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

const InventoryListItem = memo((props) => {
  const {
    isTextAlignRight,
    missAlignButton,
    desc,
    id,
    image_url,
    name,
    price,
  } = props;
  
  const [itemInCart, setItemInCart] = useState(() => 
    ShoppingCart.isItemInCart(id)
  );
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const addToCart = (itemId) => {
    if (isProblemUser()) {
      if (itemId % 2 === 1) {
        return;
      }
    } else if (isErrorUser()) {
      if (itemId % 2 === 1) {
        throw new Error("Failed to add item to the cart.");
      }
    }

    ShoppingCart.addItem({
      id: itemId,
      name,
      desc,
      price,
      image_url,
    });
    setItemInCart(true);
  };
  
  const removeFromCart = (itemId) => {
    if (isProblemUser()) {
      if (itemId % 2 === 0) {
        return;
      }
    } else if (isErrorUser()) {
      if (itemId % 2 === 0) {
        throw new Error("Failed to remove item from cart.");
      }
    }

    ShoppingCart.removeItem(itemId);
    setItemInCart(false);
  };

  let linkId = id;
  if (isProblemUser()) {
    linkId += 1;
  }
  const itemLink = `${ROUTES.INVENTORY_LIST}?id=${linkId}`;

  const itemNameClass = `inventory_item_name ${
    isTextAlignRight ? "align_right" : ""
  }`;

  return (
    <div className="inventory_item" data-test="inventory-item">
      <div className="inventory_item_img">
        <a
          href="#"
          id={`item_${id}_img_link`}
          onClick={(evt) => {
            evt.preventDefault();
            handleNavigation(itemLink);
          }}
          data-test={`item-${id}-img-link`}
        >
          <img
            alt={name}
            className="inventory_item_img"
            src={require(`../assets/img/${image_url}`).default}
            data-test={`inventory-item-${name
              .replace(/\s+/g, "-")
              .toLowerCase()}-img`}
          />
        </a>
      </div>
      <div
        className="inventory_item_description"
        data-test="inventory-item-description"
      >
        <div className="inventory_item_label">
          <a
            href="#"
            id={`item_${id}_title_link`}
            onClick={(evt) => {
              evt.preventDefault();
              handleNavigation(itemLink);
            }}
            data-test={`item-${id}-title-link`}
          >
            <div className={itemNameClass} data-test="inventory-item-name">
              {name}
            </div>
          </a>
          <div className="inventory_item_desc" data-test="inventory-item-desc">
            {desc}
          </div>
        </div>
        <div className="pricebar">
          <div
            className="inventory_item_price"
            data-test="inventory-item-price"
          >
            ${price}
          </div>
          <ButtonType
            id={id}
            itemInCart={itemInCart}
            item={name}
            missAlignButton={missAlignButton}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        </div>
      </div>
    </div>
  );
});

InventoryListItem.propTypes = {
  desc: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isTextAlignRight: PropTypes.bool,
  missAlignButton: PropTypes.bool,
};

InventoryListItem.defaultProps = {
  isTextAlignRight: false,
  missAlignButton: false,
};

export default InventoryListItem;