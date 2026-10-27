import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import { getProduct } from "../data/products";
import { itemKey, normalizeCart } from "../utils/shop";

function readStorage(key, fallback) {
  // Если браузер запретил хранилище или JSON повреждён, начинаю с пустого состояния.
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() =>
    normalizeCart(readStorage("nfr-cart", [])),
  );
  const [favorites, setFavorites] = useState(() => {
    const saved = readStorage("nfr-favorites", []);
    return Array.isArray(saved)
      ? [...new Set(saved.filter((id) => getProduct(id)))]
      : [];
  });
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    // Сохраняю только товары, без контактов и платёжных данных.
    try {
      localStorage.setItem("nfr-cart", JSON.stringify(cart));
      localStorage.setItem("nfr-favorites", JSON.stringify(favorites));
      queueMicrotask(() => setStorageError(false)); // Обновляю сообщение после синхронизации с браузерным хранилищем.
    } catch {
      queueMicrotask(() => setStorageError(true));
    }
  }, [cart, favorites]);

  function addToCart(item) {
    // Перед добавлением проверяю вариант и доступное количество.
    const product = getProduct(item.id);
    if (
      !product ||
      !product.stock ||
      !product.sizes.includes(item.size) ||
      !product.colors.includes(item.color)
    )
      return false;
    if (!Number.isInteger(item.quantity) || item.quantity < 1) return false;
    const existing = cart.find((entry) => itemKey(entry) === itemKey(item));
    if ((existing?.quantity ?? 0) + item.quantity > product.stock) return false;
    setCart((previous) => normalizeCart([...previous, item]));
    return true;
  }

  function updateQuantity(key, quantity) {
    // Ограничиваю количество остатком и не допускаю нулевых значений.
    if (!Number.isInteger(quantity) || quantity < 1) return;
    setCart((previous) =>
      normalizeCart(
        previous.map((item) =>
          itemKey(item) === key ? { ...item, quantity } : item,
        ),
      ),
    );
  }

  function toggleFavorite(id) {
    // Повторное нажатие убирает товар из избранного.
    if (!getProduct(id)) return;
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((saved) => saved !== id)
        : [...previous, id],
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + getProduct(item.id).price * item.quantity,
    0,
  );
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const value = {
    cart,
    favorites,
    addToCart,
    updateQuantity,
    toggleFavorite,
    total,
    count,
    removeFromCart: (key) =>
      setCart((previous) => previous.filter((item) => itemKey(item) !== key)),
    clearCart: () => setCart([]),
  };

  return (
    <ShopContext.Provider value={value}>
      {storageError && (
        <div className="notice" role="status">
          Браузер не разрешил сохранение. Корзина работает до перезагрузки
          страницы.
        </div>
      )}
      {children}
    </ShopContext.Provider>
  );
}
