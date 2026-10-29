import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { categories, products } from "../../data/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import logo from "../../../img/shoplogo.png";
import styles from "./Home.module.css";
import ProductImage from "../../components/ProductImage/ProductImage";
import HomeHero from "./HomeHero";
import FloatingLines from "../../components/FloatingLines/FloatingLines";

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4); // Выбираю витрину из общих данных товаров.
  return (
    <div className={styles.home}>
      <HomeHero />
      <div className={styles.interlude} aria-hidden="true" />
      <div className={styles.manifest}>
        <span>NO LABELS.</span>
        <Plus size={18} />
        <span>NO RULES.</span>
        <Plus size={18} />
        <span>JUST YOU.</span>
        <Plus size={18} />
        <span>NFR WORLDWIDE</span>
      </div>
      <section className={`${styles.selection} section`} id="selected">
        <div className={`${styles.selectionHeading} sectionHeading`}>
          <div>
            <h2>
              Outside the lines
              <br />Inside your wardrobe
            </h2>
          </div>
          <Link to="/catalog" className="textLink">
            Shop all <ArrowUpRight size={18} />
          </Link>
        </div>
        <ProductGrid products={featured} />
        <div className={styles.selectionLines} aria-hidden="true">
          <span />
          <span />
        </div>
      </section>
      <section className={`${styles.categories} section`}>
        <div className={`${styles.categoriesHeading} sectionHeading`}>
          <div>
            <h2>Build your silhouette</h2>
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
              <div className={styles.categoryVisual}>
                <span className={styles.categoryNumber}>0{index + 1}</span>
                <ProductImage
                  className={styles.categoryImage}
                  src={category.image}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div>
                <span>{category.label}</span>
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
        <div className={`${styles.selectionLines} ${styles.categoryLines}`} aria-hidden="true">
          <span />
          <span />
        </div>
      </section>
      <section className={styles.drop}>
        <div className={styles.dropImage}>
          <ProductImage
            src={products.find((product) => product.id === "08").images[0]}
            alt="Ruin long sleeve — front and back"
            loading="lazy"
          />
          <span>RUIN LONG SLEEVE / DROP 001</span>
        </div>
        <div className={styles.dropText}>
          <span className="eyebrow">NEW COLLECTION / DROP 001</span>
          <h2>
            OUT
            <br />
            OF LINE
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
        <aside className={styles.identityAside}>
          <span className={styles.identityCross} aria-hidden="true" />
          <blockquote className={styles.identityQuote}>
            <span>“Let the world see who you are.</span>
            <span>Never let fear make you smaller.”</span>
          </blockquote>
        </aside>
        <div className={styles.identityBackground} aria-hidden="true">
          <FloatingLines
            dpr={1}
            linesGradient={["#000000", "#000000"]}
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={10}
            lineDistance={6}
            bendStrength={-0.5}
            interactive
            clickSwirl
            lineStyle="solid"
            lineWidth={1}
            glow={1}
            brightness={1}
            animationSpeed={1}
            amplitude={1}
            depthOfField={0.5}
            edgeFade={0}
            bendRadius={5}
            parallax
            parallaxStrength={0.2}
            intro
            lightMode
            mixBlendMode="normal"
          />
        </div>
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
        <div className={`${styles.sideDecor} ${styles.newsDecor}`} aria-hidden="true">
          <span data-caption="YOUR WORLD. YOUR UNIFORM." />
        </div>
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
    </div>
  );
}
