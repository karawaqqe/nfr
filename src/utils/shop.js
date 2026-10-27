import { categories, getProduct } from "../data/products.js";

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  ); // Одинаковый формат цен во всём магазине.
export const itemKey = (item) => `${item.id}:${item.size}:${item.color}`; // Size и цвет отличают позиции одного товара.

export function normalizeCart(value) {
  // Проверяю сохранённые данные: localStorage может быть старым или повреждённым.
  if (!Array.isArray(value)) return [];
  const result = [];
  value.forEach((item) => {
    if (!item || typeof item !== "object") return;
    // Keep previously saved carts when translating color labels.
    const legacyColors = { "Чёрный": "Black", "Графит": "Graphite", "Серебристый": "Silver" };
    item = { ...item, color: legacyColors[item.color] || item.color };
    const product = getProduct(item.id);
    if (
      !product ||
      !product.stock ||
      !product.sizes.includes(item.size) ||
      !product.colors.includes(item.color)
    )
      return;
    if (!Number.isInteger(item.quantity) || item.quantity < 1) return;
    const existing = result.find((entry) => itemKey(entry) === itemKey(item));
    if (existing)
      existing.quantity = Math.min(
        product.stock,
        existing.quantity + item.quantity,
      );
    else
      result.push({
        id: item.id,
        size: item.size,
        color: item.color,
        quantity: Math.min(product.stock, item.quantity),
      });
  });
  return result;
}

export function filterProducts(products, filters) {
  // Применяю все выбранные фильтры одновременно, не изменяя исходный каталог.
  const result = products.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      (!filters.query ||
        `${product.name} ${product.description} ${categories.find((category) => category.slug === product.category)?.name}`
          .toLowerCase()
          .includes(filters.query.toLowerCase().trim())) &&
      (!filters.size || product.sizes.includes(filters.size)) &&
      (!filters.onlyNew || product.isNew) &&
      product.price >= filters.min &&
      product.price <= filters.max,
  );
  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (filters.sort === "newest")
    result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return result;
}
