import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import { InventoryData } from "utils/InventoryData";
import HeaderContainer from "components/layout/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "components/common/Button";
import SwagLabsFooter from "components/layout/Footer";
import "./InventoryItem.css";

interface InventoryItem {
  id: number;
  name: string;
  desc: string;
  image_url: string;
  price: number | string;
}

const InventoryItem = () => {
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState<InventoryItem | null>(null);
  const [itemInCart, setItemInCart] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const queryParams = new URLSearchParams(window.location.search);
    const inventoryIdParam = queryParams.get("id");

    if (inventoryIdParam) {
      const inventoryId = parseInt(inventoryIdParam, 10);
      const fetchedItem = InventoryData.find((invItem) => invItem.id === inventoryId);
      
      if (fetchedItem) {
        setInventoryItem(fetchedItem);
        setItemInCart(ShoppingCart.isItemInCart(fetchedItem.id));
      } else {
        const errorItem: InventoryItem = {
          id: inventoryId,
          name: "Error",
          desc: "Item not found",
          image_url: "sl-404.jpg",
          price: "√-1",
        };
        setInventoryItem(errorItem);
      }
    }
  }, []);

  const addToCart = () => {
    if (inventoryItem) {
      ShoppingCart.addItem(inventoryItem.id);
      setItemInCart(true);
    }
  };

  const removeFromCart = () => {
    if (inventoryItem) {
      ShoppingCart.removeItem(inventoryItem.id);
      setItemInCart(false);
    }
  };

  if (!inventoryItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderContainer />
      <div className="inventory_item_container">
        <div className="inventory_item_img">
          <img src={inventoryItem.image_url} alt={inventoryItem.name} />
        </div>
        <div className="inventory_item_details">
          <h2>{inventoryItem.name}</h2>
          <p>{inventoryItem.desc}</p>
          <div className="inventory_item_price">${inventoryItem.price}</div>
          {itemInCart ? (
            <Button
              customClass="inventory_item_button"
              label="Remove from Cart"
              testId={`remove-from-cart-${inventoryItem.id}`}
              onClick={removeFromCart}
              size={BUTTON_SIZES.MEDIUM}
              type={BUTTON_TYPES.SECONDARY}
            />
          ) : (
            <Button
              customClass="inventory_item_button"
              label="Add to Cart"
              testId={`add-to-cart-${inventoryItem.id}`}
              onClick={addToCart}
              size={BUTTON_SIZES.MEDIUM}
              type={BUTTON_TYPES.PRIMARY}
            />
          )}
          <Button
            customClass="inventory_item_button"
            label="Back to Products"
            testId="back-to-products"
            onClick={() => handleNavigation(ROUTES.INVENTORY)}
            size={BUTTON_SIZES.MEDIUM}
            type={BUTTON_TYPES.SECONDARY}
          />
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};

export default InventoryItem;