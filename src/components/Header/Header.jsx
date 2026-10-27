import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const { count, favorites } = useShop();
  const [menuOpen, setMenuOpen] = useState(false); // Открываю мобильную навигацию независимо от поиска.
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  function search(event) {
    // Передаю запрос каталогу через URL, чтобы результат можно было сохранить ссылкой.
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q").trim();
    navigate(`/catalog?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  }

  return (
    <header
      className={styles.header}
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
          DROP 001 — УЖЕ В КАТАЛОГЕ <ArrowUpRight size={12} />
        </Link>
      </div>
      <div className={styles.bar}>
        <Link
          to="/"
          aria-label="NFR — главная"
          className={styles.logo}
          onClick={() => setMenuOpen(false)}
        >
          <img src={logo} alt="NFR" />
          <span>NOT FOR EVERYONE</span>
        </Link>
        <nav
          aria-label="Основная навигация"
          id="main-navigation"
          className={`${styles.nav} ${menuOpen ? styles.open : ""}`}
        >
          {[
            ["/catalog", "Каталог"],
            ["/catalog?new=1", "Новый дроп"],
            ["/about", "О бренде"],
          ].map(([to, label]) => (
            <NavLink key={label} to={to} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions}>
          <button
            className="iconButton"
            aria-label="Поиск"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </button>
          <Link
            className="iconButton"
            to="/favorites"
            aria-label={`Избранное: ${favorites.length}`}
          >
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <Link
            className="iconButton"
            to="/cart"
            aria-label={`Корзина: ${count}`}
          >
            <ShoppingBag size={20} />
            <span className={styles.count}>({count})</span>
          </Link>
          <button
            className={`iconButton ${styles.menuButton}`}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
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
          <label htmlFor="header-search">Найти свою вещь</label>
          <input
            id="header-search"
            name="q"
            type="search"
            placeholder="Худи, джинсы, украшения…"
            autoFocus
          />
          <button className="button" type="submit">
            Найти <Search size={16} />
          </button>
        </form>
      )}
    </header>
  );
}
