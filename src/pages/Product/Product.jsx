import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ArrowUpRight, Check, Ruler } from "lucide-react";
import { products, categories } from "../../data/products";
import { useShop } from "../../hooks/useShop";
import { formatPrice } from "../../utils/shop";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import EmptyState from "../../components/EmptyState/EmptyState";
import Quantity from "../../components/Quantity/Quantity";
import styles from "./Product.module.css";

export default function Product() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug); // Ищу товар по адресу, неизвестный slug не ломает страницу.
  if (!product)
    return (
      <EmptyState
        title="Товар не найден"
        description="Возможно, ссылка устарела. Посмотрите другие вещи в каталоге."
      />
    );
  return <ProductDetails key={product.id} product={product} />; // При переходе к другому товару сбрасываю выбор варианта.
}

function ProductDetails({ product }) {
  const { addToCart, favorites, toggleFavorite } = useShop();
  const [size, setSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : "",
  );
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [message, setMessage] = useState(""); // Сообщаю об успехе и ошибках прямо рядом с кнопкой.
  const [added, setAdded] = useState(false);
  const category = categories.find((item) => item.slug === product.category);
  const related = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );

  function addProduct(event) {
    // Не добавляю одежду без явно выбранного размера.
    event.preventDefault();
    setAdded(false);
    if (!size) {
      setMessage("Сначала выберите размер.");
      return;
    }
    const success = addToCart({ id: product.id, size, color, quantity });
    setAdded(success);
    setMessage(
      success
        ? "Добавлено в корзину."
        : "Недостаточно доступных единиц. Проверьте количество в корзине.",
    );
  }

  return (
    <section className="section pageSection">
      <div className="breadcrumbs">
        <Link to="/catalog">Каталог</Link>
        <span>/</span>
        <Link to={`/catalog/${product.category}`}>{category.name}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className={styles.layout}>
        <div>
          <div className={styles.mainImage}>
            <img
              src={product.images[imageIndex]}
              alt={`${product.name} — ${imageIndex === 0 ? "общий эскиз" : "эскиз детали"}`}
            />
            <span>Временная иллюстрация · цвет показан условно</span>
          </div>
          <div className={styles.thumbnails}>
            {product.images.map((src, index) => (
              <button
                key={src}
                aria-label={`Показать ${index === 0 ? "общий вид" : "деталь"}`}
                aria-pressed={imageIndex === index}
                onClick={() => setImageIndex(index)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.details}>
          <span className="eyebrow">
            NFR / {product.isNew ? "DROP 001" : "CORE COLLECTION"}
          </span>
          <h1>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.stock}>
            {product.stock ? (
              <>
                <span />В наличии в демо-каталоге
              </>
            ) : (
              "Нет в наличии"
            )}
          </p>
          <form onSubmit={addProduct}>
            <fieldset>
              <legend>
                Размер <span>{size || "Выберите размер"}</span>
              </legend>
              <div className={styles.options}>
                {product.sizes.map((value) => (
                  <button
                    type="button"
                    className="option"
                    key={value}
                    aria-pressed={size === value}
                    onClick={() => {
                      setSize(value);
                      setMessage("");
                      setAdded(false);
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>
            <details className={styles.sizeGuide}>
              <summary>
                <Ruler size={15} /> Как выбрать размер
              </summary>
              <p>
                XS–XL — обозначения демонстрационных вариантов. Точные замеры
                каждой модели появятся вместе с реальными образцами. ONE SIZE
                обозначает единый размер.
              </p>
            </details>
            <fieldset>
              <legend>
                Цвет <span>{color}</span>
              </legend>
              <div className={styles.options}>
                {product.colors.map((value) => (
                  <button
                    type="button"
                    className="option"
                    key={value}
                    aria-pressed={color === value}
                    onClick={() => {
                      setColor(value);
                      setMessage("");
                      setAdded(false);
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className={styles.buyRow}>
              <Quantity
                value={quantity}
                max={product.stock}
                onChange={(value) => {
                  setQuantity(value);
                  setAdded(false);
                  setMessage("");
                }}
              />
              <button
                className="button"
                type="submit"
                disabled={!product.stock}
              >
                {added ? (
                  <>
                    <Check size={18} /> Добавлено
                  </>
                ) : (
                  "Добавить в корзину"
                )}
              </button>
              <button
                type="button"
                className="iconButton"
                aria-label="В избранное"
                aria-pressed={favorites.includes(product.id)}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  size={20}
                  fill={
                    favorites.includes(product.id) ? "currentColor" : "none"
                  }
                />
              </button>
            </div>
            <div role="status" className={added ? styles.success : "error"}>
              {message}
              {added && (
                <>
                  {" "}
                  <Link to="/cart" className="textLink">
                    Перейти в корзину <ArrowUpRight size={14} />
                  </Link>
                </>
              )}
            </div>
          </form>
          <div className={styles.notes}>
            <details>
              <summary>О модели и материалах</summary>
              <p>
                Сейчас это концепт модели. Состав, уход и реальные фотографии
                будут подтверждены перед началом продаж.
              </p>
            </details>
            <details>
              <summary>Доставка и возврат</summary>
              <p>
                Реальные отправки пока не выполняются.{" "}
                <Link to="/shipping">Подробнее об условиях демо</Link>.
              </p>
            </details>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className={styles.related}>
          <div className="sectionHeading">
            <div>
              <span className="eyebrow">COMPLETE YOUR WORLD</span>
              <h2>В том же ритме.</h2>
            </div>
          </div>
          <ProductGrid products={related} />
        </div>
      )}
    </section>
  );
}
