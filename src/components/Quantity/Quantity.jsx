import { Minus, Plus } from "lucide-react";

export default function Quantity({
  value,
  max,
  onChange,
  label = "Quantity",
}) {
  // Кнопки не позволяют выйти за доступный остаток.
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button
        type="button"
        aria-label={`Decrease: ${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label={`Increase: ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
