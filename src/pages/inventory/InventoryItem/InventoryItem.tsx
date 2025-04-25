import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/Constants";
import { ShoppingCart } from "utils/shopping-cart";
import { getProductById } from "utils/productService";
import HeaderContainer from "components/layout/HeaderContainer";
import SwagLabsFooter from "components/layout/Footer";
import "./InventoryItem.css";

interface InventoryItem {
  id: string;
  name: string;
  desc: string;
  image_url: string;
  price: number | string;
}

const InventoryItemPage = () => {
  const [inventoryItem, setInventoryItem] = useState<InventoryItem | null>(null);
  const [itemInCart, setItemInCart] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      getProductById(id)
        .then((item) => {
          setInventoryItem(item);
          setItemInCart(ShoppingCart.isItemInCart(item.id));
          loadImage(item.image_url);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, []);

  const loadImage = async (imagePath: string) => {
    try {
      // Try to dynamically import the image
      const imageModule = await import(`assets/img/${imagePath}`);
      setImageSrc(imageModule.default || imageModule);
    } catch (error) {
      console.error("Failed to load image:", error);
      // Set a fallback image or empty string
      setImageSrc("");
    }
  };

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
              {imageSrc ? (
                <img 
                  src={imageSrc}
                  alt={inventoryItem.name}
                  loading="eager"
                />
              ) : (
                <div className="image-placeholder">Loading image...</div>
              )}
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