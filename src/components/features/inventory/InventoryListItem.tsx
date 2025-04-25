import { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "utils/shopping-cart";
import { isErrorUser, isProblemUser } from "utils/Credentials";
import "./InventoryListItem.css";
import { ROUTES } from "utils/Constants";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";

interface ButtonTypeProps {
  id: string;
  item: string;
  itemInCart: boolean;
  missAlignButton?: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

const ButtonType = memo(({ id, item, itemInCart, missAlignButton, onAdd, onRemove }: ButtonTypeProps) => {
  const label = itemInCart ? "Remove" : "Add to cart";
  const onClick = itemInCart ? () => onRemove(id) : () => onAdd(id);
  const type = itemInCart ? BUTTON_TYPES.SECONDARY : BUTTON_TYPES.PRIMARY;
  const testId = `${label}-${item}`.replace(/\s+/g, "-").toLowerCase();
  const buttonClass = `btn_inventory ${missAlignButton ? "btn_inventory_misaligned" : ""}`;
  
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

interface InventoryListItemProps {
  desc: string;
  id: string;
  image_url: string;
  name: string;
  price: number;
  isTextAlignRight?: boolean;
  missAlignButton?: boolean;
}

const InventoryListItem = memo(({
  isTextAlignRight = false,
  missAlignButton = false,
  desc,
  id,
  image_url,
  name,
  price,
}: InventoryListItemProps) => {
  const [itemInCart, setItemInCart] = useState(() => ShoppingCart.isItemInCart(id));
  const [imageSrc, setImageSrc] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load the image when the component mounts
    loadImage(image_url);
  }, [image_url]);

  const loadImage = async (imagePath: string) => {
    try {
      // Try to dynamically import the image
      const imageModule = await import(`assets/img/${imagePath}`);
      setImageSrc(imageModule.default || imageModule);
    } catch (error) {
      console.error("Failed to load image:", error);
      // Try to load from public folder if import fails
      setImageSrc(`${process.env.PUBLIC_URL}/assets/img/${imagePath}`);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const addToCart = (itemId: string) => {
    // Adjust problem user and error user logic for string IDs
    if (isProblemUser()) {
      // Skip some items based on ID pattern - adjust for UUID if needed
      return;
    } else if (isErrorUser()) {
      // Throw error for some items - adjust for UUID if needed
      throw new Error("Failed to add item to the cart.");
    }

    ShoppingCart.addItem(itemId);
    setItemInCart(true);
  };
  
  const removeFromCart = (itemId: string) => {
    // Adjust problem user and error user logic for string IDs
    if (isProblemUser()) {
      // Skip some items based on ID pattern - adjust for UUID if needed
      return;
    } else if (isErrorUser()) {
      // Throw error for some items - adjust for UUID if needed
      throw new Error("Failed to remove item from cart.");
    }

    ShoppingCart.removeItem(itemId);
    setItemInCart(false);
  };

  // Adjust for string IDs
  const linkId = isProblemUser() ? `${id}-problem` : id;
  const itemLink = `${ROUTES.INVENTORY_LIST}?id=${linkId}`;
  const itemNameClass = `inventory_item_name ${isTextAlignRight ? "align_right" : ""}`;

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
          {imageSrc ? (
            <img
              alt={name}
              className="inventory_item_img"
              src={imageSrc}
              data-test={`inventory-item-${name.replace(/\s+/g, "-").toLowerCase()}-img`}
            />
          ) : (
            <div className="image-placeholder">Loading...</div>
          )}
        </a>
      </div>
      <div className="inventory_item_description" data-test="inventory-item-description">
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
          <div className="inventory_item_price" data-test="inventory-item-price">
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

export type { InventoryListItemProps as Props };
export default InventoryListItem;