import test from "node:test";
import assert from "node:assert/strict";
import { normalizeCart, filterProducts, itemKey } from "../src/utils/shop.js";
import { products } from "../src/data/products.js";

const item = { id: "01", size: "M", color: "Чёрный", quantity: 2 };
const filters = {
  category: "",
  query: "",
  size: "",
  min: 0,
  max: 500,
  sort: "newest",
  onlyNew: false,
};

test("Повреждённая корзина и удалённые варианты не ломают восстановление", () => {
  assert.deepEqual(normalizeCart(null), []);
  assert.deepEqual(
    normalizeCart([
      null,
      {},
      { ...item, id: "missing" },
      { ...item, size: "XXXL" },
      { ...item, quantity: -1 },
      { ...item, quantity: 1.5 },
      { ...item, id: "11" },
    ]),
    [],
  );
});
test("Одинаковые варианты объединяются и ограничиваются остатком", () => {
  assert.deepEqual(normalizeCart([item, { ...item, quantity: 20 }]), [
    { ...item, quantity: 8 },
  ]);
});
test("Разные размеры и цвета остаются отдельными позициями", () => {
  const result = normalizeCart([
    item,
    { ...item, size: "L" },
    { ...item, color: "Графит" },
  ]);
  assert.equal(result.length, 3);
  assert.equal(new Set(result.map(itemKey)).size, 3);
});
test("Категория, цена, размер и поиск применяются вместе", () => {
  const result = filterProducts(products, {
    ...filters,
    category: "tops",
    query: "AFTERHOURS",
    size: "M",
    min: 100,
    max: 150,
  });
  assert.deepEqual(
    result.map((product) => product.id),
    ["02"],
  );
  assert.equal(
    filterProducts(products, { ...filters, min: 400, max: 100 }).length,
    0,
  );
});
test("Сортировка не меняет каталог, новый дроп исключает старые товары", () => {
  const ids = products.map((product) => product.id);
  const result = filterProducts(products, {
    ...filters,
    sort: "price-asc",
    onlyNew: true,
  });
  assert.ok(
    result.every(
      (product, index) =>
        product.isNew && (!index || product.price >= result[index - 1].price),
    ),
  );
  assert.deepEqual(
    products.map((product) => product.id),
    ids,
  );
});
