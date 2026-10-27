import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ShopProvider } from "./context/ShopProvider";
import "./styles/global.css";

// Подключаю маршруты и общее состояние магазина ко всему приложению.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>,
);
