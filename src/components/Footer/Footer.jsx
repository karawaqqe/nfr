import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import logo from "../../../img/shoplogo.png";
import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear(); // Определяю год один раз при загрузке модуля.

export default function Footer() {
  const { pathname } = useLocation();
  // Все ссылки ведут на реальные страницы проекта.
  return (
    <footer className={`${styles.footer} ${pathname === "/" ? styles.homeFooter : ""}`}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.brand} aria-label="NFR — home">
          <img src={logo} alt="" loading="lazy" />
          <span>NO FUTURE REMAINS</span>
        </Link>
        <button className={styles.backToTop} aria-label="Back to top" onClick={() => window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        })}>
          <span>BACK TO TOP</span><ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.top}>
        <div className={styles.statement}>
          <h2>
            <span>Your style<span className={styles.accent}>.</span></span>
            <span>Your rules<span className={styles.accent}>.</span></span>
          </h2>
          <Link to="/about" className="textLink">
            This is NFR <ArrowUpRight size={18} />
          </Link>
        </div>
        <nav className={styles.navigation} aria-label="Footer — explore">
          <h3><span>01</span> Explore</h3>
          <Link to="/catalog">All pieces <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
          <Link to="/catalog?new=1">New drop <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
          <Link to="/favorites">Favorites <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
          <Link to="/cart">Cart <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
        </nav>
        <nav className={styles.navigation} aria-label="Footer — information">
          <h3><span>02</span> Information</h3>
          <Link to="/shipping">Shipping & returns <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
          <Link to="/faq">FAQ <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
          <Link to="/contact">Contact <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
          <Link to="/privacy">Privacy <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
          <Link to="/terms">Demo terms <ArrowRight size={14} strokeWidth={1.2} aria-hidden="true" /></Link>
        </nav>
      </div>
      <div className={styles.bottom}>
        <span>© {currentYear} NFR</span>
        <span>Demo storefront · USD · EN</span>
        <span>NOT FOR EVERYONE. FOR YOU.</span>
      </div>
    </footer>
  );
}
