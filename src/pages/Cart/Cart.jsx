import { Link } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import { useShop } from "../../hooks/useShop";
import { getProduct } from "../../data/products";
import { formatPrice, itemKey } from "../../utils/shop";
import Quantity from "../../components/Quantity/Quantity";
import EmptyState from "../../components/EmptyState/EmptyState";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import styles from "./Cart.module.css";
import ProductImage from "../../components/ProductImage/ProductImage";

export default function Cart() {
  const { cart, count, removeFromCart, updateQuantity } = useShop();
  return (
    <section className="section pageSection">
      <span className="eyebrow">NFR / MAKE IT YOURS</span>
      <h1>
        Cart <span className="muted">({count})</span>
      </h1>
      {cart.length ? (
        <div className={styles.layout}>
          <div>
            <ul className={styles.list}>
              {cart.map((item) => {
                const product = getProduct(item.id); // В строке корзины использую актуальную цену, а не сохранённую в браузере.
                const key = itemKey(item);
                return (
                  <li key={key} className={styles.item}>
                    <Link
                      to={`/product/${product.slug}`}
                      className={styles.image}
                    >
                      <ProductImage src={product.images[0]} alt={product.name} />
                    </Link>
                    <div className={styles.info}>
                      <Link to={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                      <p>
                        {item.size} / {item.color}
                      </p>
                      <span>{formatPrice(product.price)}</span>
                      <Quantity
                        value={item.quantity}
                        max={product.stock}
                        label={product.name}
                        onChange={(value) => updateQuantity(key, value)}
                      />
                    </div>
                    <div className={styles.end}>
                      <strong>
                        {formatPrice(product.price * item.quantity)}
                      </strong>
                      <button
                        className="iconButton"
                        aria-label={`Remove ${product.name}, ${item.size}, ${item.color}`}
                        onClick={() => removeFromCart(key)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link className="textLink" to="/catalog">
              <ArrowLeft size={16} />
              Continue shopping
            </Link>
          </div>
          <OrderSummary />
        </div>
      ) : (
        <EmptyState
          title="A clean slate."
          description="Time to find a piece to make your own."
        />
      )}
    </section>
  );
}
