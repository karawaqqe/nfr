import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  description,
  to = "/catalog",
  label = "Shop the collection",
}) {
  return (
    <div className="emptyState">
      <span className="eyebrow">NFR / NOTHING HERE YET</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="button" to={to}>
        {label}
        <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
