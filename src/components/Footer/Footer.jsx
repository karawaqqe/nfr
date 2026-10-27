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
            Твой стиль.
            <br />
            Твои правила.
          </h2>
          <Link to="/about" className="textLink">
            Это NFR <ArrowUpRight size={18} />
          </Link>
        </div>
        <div>
          <h3>Магазин</h3>
          <Link to="/catalog">Все вещи</Link>
          <Link to="/catalog?new=1">Новый дроп</Link>
          <Link to="/favorites">Избранное</Link>
          <Link to="/cart">Корзина</Link>
        </div>
        <div>
          <h3>Информация</h3>
          <Link to="/shipping">Доставка и возвраты</Link>
          <Link to="/faq">Частые вопросы</Link>
          <Link to="/contact">Контакты</Link>
          <Link to="/privacy">Конфиденциальность</Link>
          <Link to="/terms">Условия демо</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {currentYear} NFR</span>
        <span>Демонстрационная витрина · PLN · RU</span>
        <span>NOT FOR EVERYONE. FOR YOU.</span>
      </div>
    </footer>
  );
}
