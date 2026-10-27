import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear(); // Определяю год один раз при загрузке модуля.

export default function Footer() {
  // Все ссылки ведут на реальные страницы проекта.
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <span className="eyebrow">STAY OUTSIDE THE LINES</span>
          <h2>
            Your style.
            <br />
            Your rules.
          </h2>
          <Link to="/about" className="textLink">
            This is NFR <ArrowUpRight size={18} />
          </Link>
        </div>
        <div>
          <h3>Shop</h3>
          <Link to="/catalog">All pieces</Link>
          <Link to="/catalog?new=1">New drop</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div>
          <h3>Information</h3>
          <Link to="/shipping">Shipping & returns</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Demo terms</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {currentYear} NFR</span>
        <span>Demo storefront · USD · EN</span>
        <span>NOT FOR EVERYONE. FOR YOU.</span>
      </div>
    </footer>
  );
}
