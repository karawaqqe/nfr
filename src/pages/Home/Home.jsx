import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { categories, products } from "../../data/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import logo from "../../../img/shoplogo.png";
import styles from "./Home.module.css";

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4); // Выбираю витрину из общих данных товаров.
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className="eyebrow">
            <span className={styles.dot} /> INDEPENDENT CLOTHING / EST. 2026
          </div>
          <h1>
            NOT FOR
            <br />
            <span>EVERYONE.</span>
          </h1>
          <p>
            Не вписываться. Быть собой.
            <br />
            Одежда для тех, кто выбирает собственный ритм.
          </p>
          <Link className="button" to="/catalog">
            Найти своё <ArrowUpRight size={19} />
          </Link>
          <div className={styles.heroBottom}>
            <span>DROP 001 / OUT OF LINE</span>
            <a href="#selected" aria-label="К избранным вещам">
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
        <div className={styles.art}>
          <div className={styles.artLabel}>
            <span>NFR® STUDIO</span>
            <span>001 — 026</span>
          </div>
          <span className={styles.outline}>
            OUT
            <br />
            OF LINE
          </span>
          <img
            src="/products/hoodie.svg"
            alt="Эскиз чёрного худи Void с графикой NFR"
          />
          <div className={styles.artCaption}>
            <span>
              VOID OVERSIZED HOODIE
              <br />
              <small>КОНЦЕПТ КОЛЛЕКЦИИ / ЭСКИЗ</small>
            </span>
            <Link
              to="/product/void-hoodie"
              className="iconButton"
              aria-label="Смотреть Void hoodie"
            >
              <Plus />
            </Link>
          </div>
        </div>
      </section>
      <div className={styles.manifest}>
        <span>NO LABELS.</span>
        <Plus size={18} />
        <span>NO RULES.</span>
        <Plus size={18} />
        <span>JUST YOU.</span>
        <Plus size={18} />
        <span>NFR WORLDWIDE</span>
      </div>
      <section className="section" id="selected">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">01 / THE SELECTION</span>
            <h2>
              Вне рамок.
              <br />В твоём гардеробе.
            </h2>
          </div>
          <Link to="/catalog" className="textLink">
            Весь каталог <ArrowUpRight size={18} />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
      <section className={`${styles.categories} section`}>
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">02 / FIND YOUR UNIFORM</span>
            <h2>Собери свой силуэт.</h2>
          </div>
          <span className="muted">Шесть направлений. Никаких правил.</span>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <Link
              to={`/catalog/${category.slug}`}
              key={category.slug}
              className={styles.category}
            >
              <span className="eyebrow">0{index + 1}</span>
              <img
                src={`/products/${category.image}.svg`}
                alt=""
                loading="lazy"
              />
              <div>
                <span>{category.label}</span>
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.drop}>
        <div className={styles.dropImage}>
          <img
            src="/products/jacket.svg"
            alt="Эскиз куртки Static из первой коллекции"
            loading="lazy"
          />
          <span>PROTOTYPE / STATIC 001</span>
        </div>
        <div className={styles.dropText}>
          <span className="eyebrow">NEW COLLECTION / DROP 001</span>
          <h2>
            OUT
            <br />
            OF LINE<span>†</span>
          </h2>
          <p>
            Грубые фактуры. Свободные формы.
            <br />
            Детали, которые говорят за тебя.
          </p>
          <Link className="button" to="/catalog?new=1">
            Открыть дроп <ArrowUpRight size={18} />
          </Link>
          <span className={styles.dropNote}>
            Первая глава. Твоя интерпретация.
          </span>
        </div>
      </section>
      <section className={`${styles.identity} section`}>
        <img
          src={logo}
          alt="Металлический готический логотип NFR"
          loading="lazy"
        />
        <div>
          <span className="eyebrow">03 / THIS IS NFR</span>
          <h2>
            Не тренд.
            <br />
            Состояние.
          </h2>
          <p>
            NFR рождается на пересечении музыки, уличной культуры и личной
            свободы. Мы не говорим, кем тебе быть. Мы создаём пространство, где
            можно быть собой.
          </p>
          <Link to="/about" className="textLink">
            Ближе к бренду <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className={styles.news}>
        <span className="eyebrow">KEEP IN THE LOOP</span>
        <h2>Следующая глава — впереди.</h2>
        <p>
          Рассылка появится после запуска магазина.
          <br />А пока знакомься с первым дропом.
        </p>
        <Link to="/catalog?new=1" className="textLink">
          Смотреть новую коллекцию <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
