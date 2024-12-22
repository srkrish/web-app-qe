// Needed to add the below due to issues in IE11, see this thread
// https://github.com/facebook/create-react-app/issues/9906#issxRuntime classic */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { BacktraceClient, ErrorBoundary } from "@backtrace-labs/react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import PrivateRoute from "components/auth/PrivateRoute";
import "./index.css";
import Cart from "@pages/cart/Cart/Cart";
import CheckOutStepOne from "@pages/checkout/StepOne/CheckOutStepOne";
import CheckOutStepTwo from "@pages/checkout/StepTwo/CheckOutStepTwo";
import Finish from "@pages/checkout/Finish/Finish";
import Inventory from "@pages/inventory/Inventory/Inventory";
import InventoryItem from "@pages/inventory/InventoryItem/InventoryItem";
import Login from "@pages/auth/Login/Login";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ROUTES } from "@utils/Constants";
import { currentUser } from "@utils/Credentials";
import { ShoppingCart } from "@utils/shopping-cart";
import { InventoryData } from "@utils/InventoryData";
import { InventoryDataLong } from "@utils/InventoryDataLong";

BacktraceClient.initialize({
  name: "Swag Store",
  version: "3.0.0",
  url: "https://submit.backtrace.io/UNIVERSE/TOKEN/json",
  userAttributes: () => ({
    user: currentUser(),
    shoppingCart: ShoppingCart.getCartContents(),
  }),
});

const routing = (
  <ErrorBoundary>
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route 
            path={ROUTES.INVENTORY} 
            element={<Inventory data={InventoryData} />} 
          />
          <Route 
            path={ROUTES.INVENTORY_LONG} 
            element={<Inventory data={InventoryDataLong} />} 
          />
          <Route 
            path={ROUTES.INVENTORY_LIST} 
            element={<InventoryItem />} 
          />
          <Route 
            path={ROUTES.CART} 
            element={<Cart />} 
          />
          <Route 
            path={ROUTES.CHECKOUT_STEP_ONE} 
            element={<CheckOutStepOne />} 
          />
          <Route 
            path={ROUTES.CHECKOUT_STEP_TWO} 
            element={<CheckOutStepTwo />} 
          />
          <Route 
            path={ROUTES.CHECKOUT_COMPLETE} 
            element={<Finish />} 
          />
        </Route>

        {/* Catch all redirect to login */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Router>
  </ErrorBoundary>
);

// Get the root element
const container = document.getElementById("root");

// Make sure container exists
if (!container) {
  throw new Error("Failed to find the root element");
}

// Create root and render
const root = createRoot(container);
root.render(routing);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. This comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();