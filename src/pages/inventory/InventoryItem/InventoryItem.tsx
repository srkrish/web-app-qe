import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import { InventoryData } from "utils/InventoryData";
import HeaderContainer from "components/layout/HeaderContainer";
import SwagLabsFooter from "components/layout/Footer";
import "./InventoryItem.css";

interface InventoryItem {
  id: number;
  name: string;
  desc: string;
  image_url: string;
  price: number | string;
}

const InventoryItemPage = () => {
  const [inventoryItem, setInventoryItem] = useState<InventoryItem | null>(null);
  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id") || "", 10);
    
    const item = InventoryData.find((item) => item.id === id);
    if (item) {
      setInventoryItem(item);
      setItemInCart(ShoppingCart.isItemInCart(item.id));
    }
  }, []);

  const handleAddToCart = () => {
    if (inventoryItem) {
      if (itemInCart) {
        ShoppingCart.removeItem(inventoryItem.id);
        setItemInCart(false);
      } else {
        ShoppingCart.addItem(inventoryItem.id);
        setItemInCart(true);
      }
    }
  };

  if (!inventoryItem) return null;

  return (
    <div className="page-container">
      <HeaderContainer />
      <main className="main-content">
        <div className="inventory_item_container">
          <Link to={ROUTES.INVENTORY} className="back_link">
            ← Back to products
          </Link>
          
          <div className="product_details">
            <div className="product_image">
              <img 
                src={require(`assets/img/${inventoryItem.image_url}`).default}
                alt={inventoryItem.name}
                loading="eager"
              />
            </div>
            
            <div className="product_info">
              <h1 className="product_title">{inventoryItem.name}</h1>
              <p className="product_description">{inventoryItem.desc}</p>
              <div className="product_price">${inventoryItem.price}</div>
              <button 
                className="add_to_cart"
                onClick={handleAddToCart}
              >
                {itemInCart ? "Remove from cart" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <SwagLabsFooter />
    </div>
  );
};

export default InventoryItemPage;