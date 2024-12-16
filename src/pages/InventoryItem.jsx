import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isProblemUser, isErrorUser } from "../utils/Credentials";
import { ROUTES } from "../utils/Constants";
import { ShoppingCart } from "../utils/shopping-cart";
import { InventoryData } from "../utils/InventoryData";
import HeaderContainer from "../components/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "../components/Button";
import SwagLabsFooter from "../components/Footer";
import "./InventoryItem.css";
import BrokenComponent from "../components/BrokenComponent";
import { ErrorBoundary } from "@backtrace-labs/react";

const InventoryItem = () => {
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState(null);
  const [itemInCart, setItemInCart] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Get our queryparams now
    const queryParams = new URLSearchParams(window.location.search);
    let inventoryId = queryParams.get("id");

    if (inventoryId) {
      inventoryId = parseInt(inventoryId, 10);
      const fetchedItem = InventoryData.find((invItem) => invItem.id === inventoryId);
      if (fetchedItem) {
        setInventoryItem(fetchedItem);
        setItemInCart(ShoppingCart.isItemInCart(inventoryId));
      } else {
        setInventoryItem({
          id: inventoryId,
          name: "Error",
          desc: "Item not found",
          image_url: "sl-404.jpg",
          price: "√-1",
        });
      }
    }
  }, []);

  const addToCart = () => {
    if (inventoryItem) {
      ShoppingCart.addItem(inventoryItem);
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
