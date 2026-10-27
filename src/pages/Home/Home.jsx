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
            Stand apart. Be yourself.
            <br />
            Clothing for those who follow their own rhythm.
          </p>
          <Link className="button" to="/catalog">
            Find your own <ArrowUpRight size={19} />
          </Link>
          <div className={styles.heroBottom}>
            <span>DROP 001 / OUT OF LINE</span>
            <a href="#selected" aria-label="Explore selected pieces">
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
            alt="Sketch of the black Void hoodie with NFR graphics"
          />
          <div className={styles.artCaption}>
            <span>
              VOID OVERSIZED HOODIE
              <br />
              <small>COLLECTION CONCEPT / SKETCH</small>
            </span>
            <Link
              to="/product/void-hoodie"
              className="iconButton"
              aria-label="View Void hoodie"
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
              Outside the lines.
              <br />Inside your wardrobe.
            </h2>
          </div>
          <Link to="/catalog" className="textLink">
            Shop all <ArrowUpRight size={18} />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
      <section className={`${styles.categories} section`}>
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">02 / FIND YOUR UNIFORM</span>
            <h2>Build your silhouette.</h2>
          </div>
          <span className="muted">Six directions. No rules.</span>
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
            alt="Sketch of the Static jacket from the first collection"
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
            Raw textures. Relaxed shapes.
            <br />
            Details that speak for you.
          </p>
          <Link className="button" to="/catalog?new=1">
            Explore the drop <ArrowUpRight size={18} />
          </Link>
          <span className={styles.dropNote}>
            The first chapter. Your interpretation.
          </span>
        </div>
      </section>
      <section className={`${styles.identity} section`}>
        <img
          src={logo}
          alt="Metallic gothic NFR logo"
          loading="lazy"
        />
        <div>
          <span className="eyebrow">03 / THIS IS NFR</span>
          <h2>
            Beyond trends.
            <br />
            A state of mind.
          </h2>
          <p>
            NFR lives at the intersection of music, street culture and personal freedom. We create space for you to be yourself.
          </p>
          <Link to="/about" className="textLink">
            Meet the brand <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className={styles.news}>
        <span className="eyebrow">KEEP IN THE LOOP</span>
        <h2>The next chapter is ahead.</h2>
        <p>
          Our newsletter will arrive after the store launches.
          <br />Until then, explore the first drop.
        </p>
        <Link to="/catalog?new=1" className="textLink">
          View the new collection <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
