import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useShop } from "../../hooks/useShop";
import logo from "../../../img/shoplogo.png";
import styles from "./Header.module.css";

export default function Header() {
  const headerRef = useRef(null);
  const { count, favorites } = useShop();
  const [menuOpen, setMenuOpen] = useState(false); // Открываю мобильную навигацию независимо от поиска.
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useLayoutEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerRef.current.getBoundingClientRect().height}px`,
      );
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerRef.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  function search(event) {
    // Передаю запрос каталогу через URL, чтобы результат можно было сохранить ссылкой.
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q").trim();
    navigate(`/catalog?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  }

  return (
    <>
    <div className={styles.spacer} aria-hidden="true" />
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
          setSearchOpen(false);
        }
      }}
    >
      <div className={styles.strip}>
        <span>INDEPENDENT MINDS. DIFFERENT UNIFORMS.</span>
        <Link to="/catalog?new=1">
          DROP 001 — AVAILABLE NOW <ArrowUpRight size={12} />
        </Link>
      </div>
      <div className={styles.bar}>
        <Link
          to="/"
          aria-label="NFR — home"
          className={styles.logo}
          onClick={() => setMenuOpen(false)}
        >
          <img src={logo} alt="NFR" />
          <span className={styles.brandText}>
            <strong>NFR®</strong>
            <span>NOT FOR<br />EVERYONE</span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          id="main-navigation"
          className={`${styles.nav} ${menuOpen ? styles.open : ""}`}
        >
          <span className={styles.panelMark} aria-hidden="true">NFR STUDIO<span>EST. 2026 / INDEPENDENT</span></span>
          {[
            ["/catalog", "Catalog"],
            ["/catalog?new=1", "New drop"],
            ["/about", "About"],
          ].map(([to, label], index) => (
            <Link key={label} to={to} aria-current={(
              index === 0 ? (location.pathname.startsWith("/catalog") && new URLSearchParams(location.search).get("new") !== "1") || location.pathname.startsWith("/product/") :
              index === 1 ? location.pathname.startsWith("/catalog") && new URLSearchParams(location.search).get("new") === "1" : location.pathname === "/about"
            ) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              <span className={styles.navIndex}>0{index + 1}</span>
              <span className={styles.navLabel}>{label}</span>
              {label === "New drop" && <span className={styles.dropDot} />}
              <ArrowUpRight className={styles.navArrow} size={14} aria-hidden="true" />
            </Link>
          ))}
          <span className={styles.panelEdition} aria-hidden="true">COLLECTION<span>001 — 026</span></span>
        </nav>
        <div className={styles.actions}>
          <button
            className="iconButton"
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </button>
          <Link
            className="iconButton"
            to="/favorites"
            aria-label={`Favorites: ${favorites.length}`}
          >
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <Link
            className="iconButton"
            to="/cart"
            aria-label={`Cart: ${count}`}
          >
            <ShoppingBag size={20} />
            <span className={styles.count}>({count})</span>
          </Link>
          <button
            className={`iconButton ${styles.menuButton}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {searchOpen && (
        <form id="site-search" className={styles.search} onSubmit={search}>
          <label htmlFor="header-search">Find your piece</label>
          <input
            id="header-search"
            name="q"
            type="search"
            placeholder="Hoodies, jeans, jewelry…"
            autoFocus
          />
          <button className="button" type="submit">
            Search <Search size={16} />
          </button>
        </form>
      )}
    </header>
    </>
  );
}
