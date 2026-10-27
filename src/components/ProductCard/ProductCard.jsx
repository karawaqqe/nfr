import { Heart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../../data/products";
import { useShop } from "../../hooks/useShop";
import { formatPrice } from "../../utils/shop";
import styles from "./ProductCard.module.css";
import ProductImage from "../ProductImage/ProductImage";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useShop();
  const saved = favorites.includes(product.id); // Показываю актуальное состояние избранного на всех страницах.
  return (
    <article className={styles.card} data-category={product.category}>
      <div className={styles.visual}>
        <Link to={`/product/${product.slug}`} tabIndex={-1} aria-hidden="true">
          <ProductImage src={product.images[0]} />
        </Link>
        <div className={styles.tags}>
          {product.isNew && <span>NEW DROP</span>}
          {!product.stock && <span>OUT OF STOCK</span>}
        </div>
        <button
          className={`iconButton ${styles.favorite} ${saved ? styles.saved : ""}`}
          aria-label={`${saved ? "Remove from favorites" : "Add to favorites"}: ${product.name}`}
          aria-pressed={saved}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className={styles.info}>
        <div>
          <p>
            {
              categories.find((category) => category.slug === product.category)
                ?.name
            }
          </p>
          <Link to={`/product/${product.slug}`} className={styles.name}>
            {product.name} <ArrowUpRight size={16} />
          </Link>
        </div>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
