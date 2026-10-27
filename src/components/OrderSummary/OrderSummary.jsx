import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useShop } from "../../hooks/useShop";
import { getProduct } from "../../data/products";
import { formatPrice, itemKey } from "../../utils/shop";
import styles from "./OrderSummary.module.css";

export default function OrderSummary({ checkout = false }) {
  const { total, count, cart } = useShop();
  return (
    <aside className={styles.summary}>
      <h2>Your selection</h2>
      {checkout && (
        <ul className={styles.items}>
          {cart.map((item) => (
            <li key={itemKey(item)}>
              <span>
                {getProduct(item.id).name}
                <small>
                  {item.size} / {item.color} × {item.quantity}
                </small>
              </span>
              <span>
                {formatPrice(getProduct(item.id).price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div>
        <span>Items ({count})</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div>
        <span>Shipping</span>
        <span>Not available</span>
      </div>
      <div className={styles.total}>
        <span>Demo total</span>
        <strong>{formatPrice(total)}</strong>
      </div>
      {!checkout && (
        <Link className="button" to="/checkout">
          Checkout <ArrowUpRight size={18} />
        </Link>
      )}
      <p>
        Demo store. No payment is taken and no order is shipped.
      </p>
    </aside>
  );
}
