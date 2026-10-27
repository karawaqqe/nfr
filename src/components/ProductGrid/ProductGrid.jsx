import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({ products }) {
  // Использую одну сетку для каталога, главной и избранного.
  return (
    <div className="productGrid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
