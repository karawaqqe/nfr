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
  const [params, setParams] = useSearchParams(); // Filters живут в URL и сохраняются после обновления страницы.
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
        title="Category not found"
        description="Explore a category in the full catalog."
      />
    );
  return (
    <section className="section pageSection">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Catalog</span>
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
              (filters.onlyNew ? "New drop." : "Your new uniform.")}
          </h1>
        </div>
        <span className="muted">Pieces with character. No extra words.</span>
      </div>
      <div className={styles.categoryLinks}>
        <Link to="/catalog" aria-current={!category ? "page" : undefined}>
          All
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
            Search
            <input
              key={filters.query}
              name="q"
              type="search"
              defaultValue={filters.query}
              placeholder="Name or description"
            />
          </label>
          <button className="button" type="submit">
            Search
          </button>
        </form>
        <label>
          Sort by
          <select
            value={filters.sort}
            onChange={(event) => changeFilter("sort", event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <button
          className={`button secondary ${styles.mobileFilter}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
          aria-controls="catalog-filters"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>
      <div className={styles.layout}>
        <aside
          id="catalog-filters"
          className={`${styles.filters} ${filtersOpen ? styles.visible : ""}`}
        >
          <div className={styles.filterTitle}>
            <h2>Filters</h2>
            <SlidersHorizontal size={16} />
          </div>
          <fieldset>
            <legend>Price, $</legend>
            <p className={styles.filterHint}>
              Applied when you leave the field.
            </p>
            <div className={styles.priceInputs}>
              <label>
                From
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
                To
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
              <p className="error">Minimum price exceeds maximum price.</p>
            )}
          </fieldset>
          <fieldset>
            <legend>Size</legend>
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
            New collection
          </label>
          <Link
            className="textLink"
            to="/catalog"
            onClick={() => setFiltersOpen(false)}
          >
            Reset all <X size={14} />
          </Link>
        </aside>
        <div>
          <p className={styles.result} aria-live="polite">
            Items found: {found.length}
            <span>THE NFR COLLECTION / DROP 001</span>
          </p>
          {found.length ? (
            <ProductGrid products={found} />
          ) : (
            <div className="emptyState">
              <h2>Nothing here yet.</h2>
              <p>Try another search or remove some filters.</p>
              <button className="button" onClick={() => setParams({})}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
