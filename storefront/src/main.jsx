import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <OrdersProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </OrdersProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
