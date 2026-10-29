import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { products } from "../../data/products";
import GhostFibers from "../../components/GhostFibers/GhostFibers";
import ProductImage from "../../components/ProductImage/ProductImage";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const piece = products.find((product) => product.id === "08");

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
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
          offsetX={-0.3}
          offsetY={0.2}
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
      <div className={styles.issue}>
        <span>
          <span className={styles.dot} /> INDEPENDENT BY DESIGN
        </span>
        <span>NFR® STUDIO — VOL. 001 / 2026</span>
      </div>
      <div className={styles.copy}>
        <div className={styles.headline}>
          <span className={styles.sideNote} aria-hidden="true">
            NOT FOR EVERYONE. / FOR YOU.
          </span>
          <h1 id="hero-title">
            <span className={styles.lead}>DRESS</span>
            <span className={styles.outline}>OFF</span>
            <span className={styles.serif}>SCRIPT<span className={styles.titlePeriod}>.</span></span>
          </h1>
        </div>
        <div className={styles.intro}>
          <span className={styles.introMark} aria-hidden="true">
            ↳
          </span>
          <p>
            No dress code. No permission needed.
            <br />
            Just pieces that feel like you.
          </p>
        </div>
        <div className={styles.cta}>
          <Link className={styles.shopButton} to="/catalog">
            Find your own <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <Link className={styles.dropLink} to="/catalog?new=1">
            Explore drop 001
          </Link>
        </div>
      </div>
      <div className={styles.editorial}>
        <div className={styles.edition} aria-hidden="true">
          THE FIRST CHAPTER
        </div>
        <Link
          className={styles.photo}
          to={`/product/${piece.slug}`}
          aria-label={`View ${piece.name}`}
        >
          <div className={styles.photoMeta}>
            <span>NFR® / OBJECT STUDY</span>
            <Plus size={14} aria-hidden="true" />
          </div>
          <ProductImage
            src={piece.images[0]}
            alt="Ruin long sleeve, front and back, with distressed star artwork"
            loading="eager"
          />
          <span className={styles.photoIndex} aria-hidden="true">
            FIG. 08 — FRONT / BACK
          </span>
          <span className={styles.photoBottom}>
            <span>VIEW PIECE</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </span>
        </Link>
        <div className={styles.imageCaption}>
          <span>RUIN LONG SLEEVE / FIG. 08</span>
          <span>DROP 001 / OUT OF LINE</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>DIFFERENT MINDS. DIFFERENT UNIFORMS.</span>
        <a href="#selected">
          THE SELECTION <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
