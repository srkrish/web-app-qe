import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { BacktraceClient, ErrorBoundary } from "@backtrace-labs/react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import PrivateRoute from "components/auth/PrivateRoute";
import "./index.css";
import Cart from "pages/cart/Cart/Cart";
import CheckOutStepOne from "pages/checkout/StepOne/CheckOutStepOne";
import CheckOutStepTwo from "pages/checkout/StepTwo/CheckOutStepTwo";
import Finish from "pages/checkout/Finish/Finish";
import Inventory from "pages/inventory/Inventory/Inventory";
import InventoryItem from "pages/inventory/InventoryItem/InventoryItem";
import Login from "pages/auth/Login/Login";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ROUTES } from "utils/Constants";
import { currentUser } from "utils/Credentials";
import { ShoppingCart } from "utils/shopping-cart";

declare module 'react-dom/client' {
  export function createRoot(container: Element | null): {
    render(children: React.ReactNode): void;
  };
}

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
        
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.INVENTORY} element={<Inventory />} />
          <Route path={ROUTES.INVENTORY_LONG} element={<Inventory />} />
          <Route path={ROUTES.INVENTORY_LIST} element={<InventoryItem />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.CHECKOUT_STEP_ONE} element={<CheckOutStepOne />} />
          <Route path={ROUTES.CHECKOUT_STEP_TWO} element={<CheckOutStepTwo />} />
          <Route path={ROUTES.CHECKOUT_COMPLETE} element={<Finish />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Router>
  </ErrorBoundary>
);

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(routing);

serviceWorkerRegistration.register();