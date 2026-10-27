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
        Избранное <span className="muted">({saved.length})</span>
      </h1>
      {saved.length ? (
        <ProductGrid products={saved} />
      ) : (
        <EmptyState
          title="То, что зацепило."
          description="Нажмите на сердце у понравившейся вещи — она останется здесь."
        />
      )}
    </section>
  );
}
