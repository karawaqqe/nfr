import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Checkout from "./pages/Checkout/Checkout";
import Info from "./pages/Info/Info";
import EmptyState from "./components/EmptyState/EmptyState";

export default function App() {
  // Держу все маршруты вместе а header и footer — в общем Layout.
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="catalog/:category" element={<Catalog />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="checkout" element={<Checkout />} />
        {["about", "contact", "shipping", "faq", "privacy", "terms"].map(
          (page) => (
            <Route key={page} path={page} element={<Info page={page} />} />
          ),
        )}
        <Route
          path="*"
          element={
            <EmptyState
              title="404 — off the map"
              description="This page does not exist. But there are pieces worth finding."
              to="/"
              label="Back to home"
            />
          }
        />
      </Route>
    </Routes>
  );
}
