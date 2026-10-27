import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import { useShop } from "../../hooks/useShop";
import { formatPrice } from "../../utils/shop";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import EmptyState from "../../components/EmptyState/EmptyState";
import styles from "./Checkout.module.css";

const fields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    wide: true,
  },
  { name: "firstName", label: "First name", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", autoComplete: "family-name" },
  {
    name: "address",
    label: "Street address, building, apartment",
    autoComplete: "street-address",
    wide: true,
  },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code" },
  { name: "city", label: "City", autoComplete: "address-level2" },
];

export default function Checkout() {
  const { cart, total, count, clearCart } = useShop();
  const [errors, setErrors] = useState({}); // Показываю ошибки рядом с конкретными полями.
  const [order, setOrder] = useState(null); // Демо-результат живёт только в памяти текущей страницы.

  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const nextErrors = {};
    fields.forEach((field) => {
      if (!data[field.name]?.trim())
        nextErrors[field.name] = "Please fill in this field.";
    });
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      nextErrors.email = "Enter an email in the format name@example.com.";
    if (
      data.postalCode?.trim() &&
      (data.country === "PL"
        ? !/^\d{2}-\d{3}$/.test(data.postalCode.trim())
        : !/^\d{5}$/.test(data.postalCode.trim()))
    )
      nextErrors.postalCode =
        data.country === "PL"
          ? "For Poland, use the format 00-000."
          : "Postal code must contain 5 digits.";
    if (!["PL", "DE"].includes(data.country))
      nextErrors.country = "Please select a country.";
    if (!data.consent)
      nextErrors.consent = "Please confirm that you understand the demo terms.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.currentTarget.elements[Object.keys(nextErrors)[0]]?.focus();
      return;
    }
    if (!cart.length) return; // Не создаю заказ из пустой корзины.
    setOrder({
      number: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      total,
      count,
    });
    clearCart(); // Очищаю корзину только после успешной проверки, контакты никуда не отправляю.
    window.scrollTo(0, 0);
  }

  if (order)
    return (
      <section className={styles.complete} role="status">
        <Check size={36} />
        <span className="eyebrow">{order.number}</span>
        <h1>Demo order created.</h1>
        <p>
          You have completed checkout.
          <br />
          No payment was taken. The order was not sent to the store and will not be shipped.
        </p>
        <p>
          Items: {order.count} · {formatPrice(order.total)}
        </p>
        <p className="muted">
          Your contact details were not saved or sent to a server.
        </p>
        <Link className="button" to="/catalog">
          Back to the catalog <ArrowUpRight size={18} />
        </Link>
      </section>
    );
  if (!cart.length)
    return (
      <EmptyState
        title="Choose your pieces first."
        description="Add at least one item to your cart to place a demo order."
      />
    );

  return (
    <section className="section pageSection">
      <div className="breadcrumbs">
        <Link to="/cart">Cart</Link>
        <span>/</span>
        <span>Checkout</span>
      </div>
      <span className="eyebrow">NFR / ONE LAST STEP</span>
      <h1>Almost yours.</h1>
      <div className="notice">
        Demo mode. Feel free to use fictional contact details. No real purchase is made.
      </div>
      <div className={styles.layout}>
        <form noValidate onSubmit={submit}>
          <h2>Contact & shipping</h2>
          <div className={styles.fields}>
            {fields.map((field) => (
              <label
                key={field.name}
                className={field.wide ? styles.wide : ""}
                htmlFor={field.name}
              >
                {field.label} *
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  autoComplete={field.autoComplete}
                  required
                  maxLength={field.name === "postalCode" ? 10 : 150}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? `${field.name}-error` : undefined
                  }
                />
                {errors[field.name] && (
                  <span id={`${field.name}-error`} className="error">
                    {errors[field.name]}
                  </span>
                )}
              </label>
            ))}
            <label className={styles.wide} htmlFor="country">
              Country *
              <select
                name="country"
                id="country"
                autoComplete="country"
                defaultValue="PL"
              >
                <option value="PL">Poland</option>
                <option value="DE">Germany</option>
              </select>
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </label>
          </div>
          <p className={styles.hint}>
            Postal codes: Poland — 00-000, Germany — 00000. Countries are included to demonstrate the form.
          </p>
          <div className={styles.payment}>
            <h2>Payment</h2>
            <p>
              A payment provider is not connected yet. No bank details are requested.
            </p>
          </div>
          <label className="checkbox">
            <input
              name="consent"
              type="checkbox"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I understand the{" "}
              <Link to="/terms" target="_blank" rel="noreferrer">
                demo terms
              </Link>
              : this is an interface demo, not a real order.
            </span>
          </label>
          {errors.consent && (
            <p className="error" id="consent-error">
              {errors.consent}
            </p>
          )}
          <button type="submit" className="button">
            Create demo order <ArrowUpRight size={18} />
          </button>
        </form>
        <OrderSummary checkout />
      </div>
    </section>
  );
}
