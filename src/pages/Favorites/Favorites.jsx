import { useShop } from "../../hooks/useShop";
import { products } from "../../data/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import EmptyState from "../../components/EmptyState/EmptyState";

export default function Favorites() {
  const { favorites } = useShop();
  const saved = products.filter((product) => favorites.includes(product.id)); // Беру свежие данные, а в хранилище держу только ID.
  return (
    <section className="section pageSection">
      <span className="eyebrow">NFR / YOUR SELECTION</span>
      <h1>
        Favorites <span className="muted">({saved.length})</span>
      </h1>
      {saved.length ? (
        <ProductGrid products={saved} />
      ) : (
        <EmptyState
          title="The pieces that stayed with you."
          description="Tap the heart on a piece you love to save it here."
        />
      )}
    </section>
  );
}
