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
  { name: "firstName", label: "Имя", autoComplete: "given-name" },
  { name: "lastName", label: "Фамилия", autoComplete: "family-name" },
  {
    name: "address",
    label: "Улица, дом, квартира",
    autoComplete: "street-address",
    wide: true,
  },
  { name: "postalCode", label: "Почтовый индекс", autoComplete: "postal-code" },
  { name: "city", label: "Город", autoComplete: "address-level2" },
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
        nextErrors[field.name] = "Заполните это поле.";
    });
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      nextErrors.email = "Укажите email в формате name@example.com.";
    if (
      data.postalCode?.trim() &&
      (data.country === "PL"
        ? !/^\d{2}-\d{3}$/.test(data.postalCode.trim())
        : !/^\d{5}$/.test(data.postalCode.trim()))
    )
      nextErrors.postalCode =
        data.country === "PL"
          ? "Для Польши используйте формат 00-000."
          : "Индекс должен содержать 5 цифр.";
    if (!["PL", "DE"].includes(data.country))
      nextErrors.country = "Выберите страну.";
    if (!data.consent)
      nextErrors.consent = "Подтвердите, что понимаете условия демо.";
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
        <h1>Демо-заказ создан.</h1>
        <p>
          Вы прошли весь путь оформления.
          <br />
          Деньги не списаны, заказ не передан магазину и не будет отправлен.
        </p>
        <p>
          Товаров: {order.count} · {formatPrice(order.total)}
        </p>
        <p className="muted">
          Контактные данные не сохранены и не отправлены на сервер.
        </p>
        <Link className="button" to="/catalog">
          Вернуться в каталог <ArrowUpRight size={18} />
        </Link>
      </section>
    );
  if (!cart.length)
    return (
      <EmptyState
        title="Сначала выберите вещи."
        description="Для оформления демо-заказа добавьте хотя бы один товар в корзину."
      />
    );

  return (
    <section className="section pageSection">
      <div className="breadcrumbs">
        <Link to="/cart">Корзина</Link>
        <span>/</span>
        <span>Оформление</span>
      </div>
      <span className="eyebrow">NFR / ONE LAST STEP</span>
      <h1>Почти твоё.</h1>
      <div className="notice">
        Демо-режим. Можно использовать вымышленные контактные данные. Реальная
        покупка не совершается.
      </div>
      <div className={styles.layout}>
        <form noValidate onSubmit={submit}>
          <h2>Контакты и доставка</h2>
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
              Страна *
              <select
                name="country"
                id="country"
                autoComplete="country"
                defaultValue="PL"
              >
                <option value="PL">Польша</option>
                <option value="DE">Германия</option>
              </select>
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </label>
          </div>
          <p className={styles.hint}>
            Индекс: Польша — 00-000, Германия — 00000. Страны представлены для
            демонстрации формы.
          </p>
          <div className={styles.payment}>
            <h2>Оплата</h2>
            <p>
              Платёжный провайдер ещё не подключён. Банковские данные не
              запрашиваются.
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
              Я понимаю{" "}
              <Link to="/terms" target="_blank" rel="noreferrer">
                условия демо
              </Link>
              : это проверка интерфейса, а не реальный заказ.
            </span>
          </label>
          {errors.consent && (
            <p className="error" id="consent-error">
              {errors.consent}
            </p>
          )}
          <button type="submit" className="button">
            Создать демо-заказ <ArrowUpRight size={18} />
          </button>
        </form>
        <OrderSummary checkout />
      </div>
    </section>
  );
}
