import { useParams, useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { products, categories } from "../../data/products";
import { filterProducts } from "../../utils/shop";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import EmptyState from "../../components/EmptyState/EmptyState";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams(); // Фильтры живут в URL и сохраняются после обновления страницы.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const selectedCategory = categories.find((item) => item.slug === category);
  const filters = {
    category,
    query: params.get("q") || "",
    size: params.get("size") || "",
    min: Math.max(0, Number(params.get("min")) || 0),
    max: params.has("max") ? Math.max(0, Number(params.get("max")) || 0) : 500,
    sort: params.get("sort") || "newest",
    onlyNew: params.get("new") === "1",
  };
  const found = filterProducts(products, filters);

  // Текст подтверждаю кнопкой, а цену — после выхода из поля: обновление URL не перебивает ввод.
  function changeFilter(key, value) {
    // Меняю только один фильтр, сохраняя остальные параметры.
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value === "") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  }

  if (category && !selectedCategory)
    return (
      <EmptyState
        title="Категория не найдена"
        description="Выберите направление в общем каталоге."
      />
    );
  return (
    <section className="section pageSection">
      <div className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <span>Каталог</span>
        {selectedCategory && (
          <>
            <span>/</span>
            <span>{selectedCategory.name}</span>
          </>
        )}
      </div>
      <div className="sectionHeading">
        <div>
          <span className="eyebrow">NFR / THE WARDROBE</span>
          <h1>
            {selectedCategory?.name ||
              (filters.onlyNew ? "Новый дроп." : "Твоя новая форма.")}
          </h1>
        </div>
        <span className="muted">Вещи с характером. Без лишних слов.</span>
      </div>
      <div className={styles.categoryLinks}>
        <Link to="/catalog" aria-current={!category ? "page" : undefined}>
          Всё
        </Link>
        {categories.map((item) => (
          <Link
            key={item.slug}
            to={`/catalog/${item.slug}`}
            aria-current={category === item.slug ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className={styles.toolbar}>
        <form
          className={styles.searchForm}
          onSubmit={(event) => {
            event.preventDefault();
            changeFilter(
              "q",
              new FormData(event.currentTarget).get("q").trim(),
            );
          }}
        >
          <label className={styles.search}>
            Поиск
            <input
              key={filters.query}
              name="q"
              type="search"
              defaultValue={filters.query}
              placeholder="Название или описание"
            />
          </label>
          <button className="button" type="submit">
            Найти
          </button>
        </form>
        <label>
          Сортировка
          <select
            value={filters.sort}
            onChange={(event) => changeFilter("sort", event.target.value)}
          >
            <option value="newest">Сначала новые</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </label>
        <button
          className={`button secondary ${styles.mobileFilter}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
          aria-controls="catalog-filters"
        >
          <SlidersHorizontal size={16} />
          Фильтры
        </button>
      </div>
      <div className={styles.layout}>
        <aside
          id="catalog-filters"
          className={`${styles.filters} ${filtersOpen ? styles.visible : ""}`}
        >
          <div className={styles.filterTitle}>
            <h2>Фильтры</h2>
            <SlidersHorizontal size={16} />
          </div>
          <fieldset>
            <legend>Цена, $</legend>
            <p className={styles.filterHint}>
              Применяется после выхода из поля.
            </p>
            <div className={styles.priceInputs}>
              <label>
                От
                <input
                  type="number"
                  min="0"
                  max="500"
                  key={"min-" + params.get("min")}
                  defaultValue={params.get("min") || ""}
                  placeholder="0"
                  onBlur={(event) => changeFilter("min", event.target.value)}
                />
              </label>
              <label>
                До
                <input
                  type="number"
                  min="0"
                  max="500"
                  key={"max-" + params.get("max")}
                  defaultValue={params.get("max") ?? ""}
                  placeholder="500"
                  onBlur={(event) => changeFilter("max", event.target.value)}
                />
              </label>
            </div>
            {filters.min > filters.max && (
              <p className="error">Минимальная цена выше максимальной.</p>
            )}
          </fieldset>
          <fieldset>
            <legend>Размер</legend>
            <div className={styles.sizes}>
              {["XS", "S", "M", "L", "XL", "ONE SIZE"].map((size) => (
                <button
                  key={size}
                  className="option"
                  aria-pressed={filters.size === size}
                  onClick={() =>
                    changeFilter("size", filters.size === size ? "" : size)
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={filters.onlyNew}
              onChange={(event) =>
                changeFilter("new", event.target.checked ? "1" : "")
              }
            />
            Новая коллекция
          </label>
          <Link
            className="textLink"
            to="/catalog"
            onClick={() => setFiltersOpen(false)}
          >
            Сбросить всё <X size={14} />
          </Link>
        </aside>
        <div>
          <p className={styles.result} aria-live="polite">
            Найдено товаров: {found.length}
            <span>КОНЦЕПТ-КАТАЛОГ / ЭСКИЗЫ</span>
          </p>
          {found.length ? (
            <ProductGrid products={found} />
          ) : (
            <div className="emptyState">
              <h2>Пока ничего.</h2>
              <p>Попробуйте другой запрос или уберите часть фильтров.</p>
              <button className="button" onClick={() => setParams({})}>
                Очистить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
