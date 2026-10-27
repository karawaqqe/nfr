import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { categories, products } from "../../data/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import logo from "../../../img/shoplogo.png";
import styles from "./Home.module.css";
import ProductImage from "../../components/ProductImage/ProductImage";
import GhostFibers from "../../components/GhostFibers/GhostFibers";

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4); // Выбираю витрину из общих данных товаров.
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true">
          <GhostFibers
            glowColor="#686869"
            layers={3}
            twist={1.2}
            threads={72}
            fiberStyle="dots"
            depthOfField={0.85}
            hoverEffect="focus"
            intro
            mouseInteraction
            lineColor="#ffffff"
            secondaryColor="#6d6d6d"
            gradient="depth"
            waves={1}
            volume={0.7}
            spread={1}
            scale={1}
            rotation={18}
            perspective={0.65}
            density={1}
            thickness={1}
            tips={0}
            foldGlow={1}
            speed={0.5}
            flow={0.4}
            rollSpeed={0.15}
            focusDepth={0}
            particles={0.5}
            sparkle={0.5}
            glow={0.8}
            brightness={1}
            vignette={0.3}
            grain={0.06}
            mouseStrength={1}
            pulseOnClick
            lightMode={false}
          />
        </div>
        <div className={styles.heroText}>
          <div className={styles.heroKicker}>
            <span><span className={styles.dot} /> INDEPENDENT CLOTHING</span>
            <span>VOL. 001 / EST. 2026</span>
          </div>
          <div className={styles.titleBlock}>
          {/* <span className={styles.heroStamp} aria-hidden="true">DRESS<br />OFF SCRIPT ↗</span> */}
          <h1>
            <span className={styles.titleLead}>NOT FOR</span>
            <span className={styles.titleSerif}>EVERYONE.</span>
          </h1>
          <div className={styles.titleFootnote}><span>NO DRESS CODE. NO PERMISSION NEEDED.</span><Plus size={14} aria-hidden="true" /></div>
          </div>
          <p>
            Stand apart. Be yourself.
            <br />
            Clothing for those who follow their own rhythm.
          </p>
          <div className={styles.heroCta}>
            <Link className={`button ${styles.heroButton}`} to="/catalog">
              Find your own <ArrowUpRight size={19} />
            </Link>
            <span>YOUR WORLD.<br />YOUR UNIFORM.</span>
          </div>
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
          <ProductImage
            src={products.find((product) => product.id === "08").images[0]}
            alt="Void oversized hoodie with distressed NFR lettering"
            loading="eager"
          />
          <span className={styles.photoIndex} aria-hidden="true">01 / OUT OF LINE</span>
          {/* <div className={styles.photoTicket} aria-hidden="true"><span>THE FIRST CHAPTER</span><strong>Outsiders<br />welcome.</strong><span>NFR® — INDEPENDENT BY DESIGN</span></div> */}
          <div className={styles.artCaption}>
            <span>
              VOID OVERSIZED HOODIE
              <br />
              <small>DROP 001 / NFR STUDIO</small>
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
      <section className={`${styles.selection} section`} id="selected">
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
              <ProductImage
                className={styles.categoryImage}
                src={category.image}
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
    </div>
  );
}
