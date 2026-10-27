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
import ProductImage from "../../components/ProductImage/ProductImage";

export default function Product() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug); // Ищу товар по адресу, неизвестный slug не ломает страницу.
  if (!product)
    return (
      <EmptyState
        title="Product not found"
        description="This link may be out of date. Explore other pieces in the catalog."
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
      setMessage("Please select a size first.");
      return;
    }
    const success = addToCart({ id: product.id, size, color, quantity });
    setAdded(success);
    setMessage(
      success
        ? "Added to cart."
        : "Not enough stock available. Check the quantity in your cart.",
    );
  }

  return (
    <section className="section pageSection">
      <div className="breadcrumbs">
        <Link to="/catalog">Catalog</Link>
        <span>/</span>
        <Link to={`/catalog/${product.category}`}>{category.name}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className={styles.layout}>
        <div>
          <div className={styles.mainImage}>
            <ProductImage
              src={product.images[imageIndex]}
              alt={product.name}
              loading="eager"
            />
          </div>
          {product.images.length > 1 && <div className={styles.thumbnails}>
            {product.images.map((src, index) => (
              <button
                key={src}
                aria-label={`Show ${index === 0 ? "full view" : "detail"}`}
                aria-pressed={imageIndex === index}
                onClick={() => setImageIndex(index)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>}
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
                <span />
                In stock in the demo catalog
              </>
            ) : (
              "Out of stock"
            )}
          </p>
          <form onSubmit={addProduct}>
            <fieldset>
              <legend>
                Size <span>{size || "Select a size"}</span>
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
                <Ruler size={15} /> Choosing your size
              </summary>
              <p>
                XS–XL are demo size options. Exact measurements will be added
                when physical samples are available. ONE SIZE means a single
                size option.
              </p>
            </details>
            <fieldset>
              <legend>
                Color <span>{color}</span>
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
                    <Check size={18} /> Added
                  </>
                ) : (
                  "Add to cart"
                )}
              </button>
              <button
                type="button"
                className="iconButton"
                aria-label="Add to favorites"
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
                    View cart <ArrowUpRight size={14} />
                  </Link>
                </>
              )}
            </div>
          </form>
          <div className={styles.notes}>
            <details>
              <summary>Design & materials</summary>
              <p>
                This is currently a concept design. Materials, care instructions
                and real photos will be confirmed before sales begin.
              </p>
            </details>
            <details>
              <summary>Shipping & returns</summary>
              <p>
                Real orders are not being shipped yet.{" "}
                <Link to="/shipping">Read the demo terms</Link>.
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
              <h2>On the same wavelength.</h2>
            </div>
          </div>
          <ProductGrid products={related} />
        </div>
      )}
    </section>
  );
}
