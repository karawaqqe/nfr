import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { infoPages, questions } from "../../data/info";
import styles from "./Info.module.css";

export default function Info({ page }) {
  const content = infoPages[page]; // Общая разметка сохраняет единый стиль информационных страниц.
  if (page === "faq")
    return (
      <section className={`${styles.page} section`}>
        <span className="eyebrow">A FEW ANSWERS</span>
        <h1>Хороший вопрос.</h1>
        <p className={styles.intro}>Всё о текущей версии NFR.</p>
        <div className={styles.faq}>
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <Link to="/catalog" className="textLink">
          Вернуться к вещам <ArrowUpRight size={18} />
        </Link>
      </section>
    );
  return (
    <section className={`${styles.page} section`}>
      <span className="eyebrow">NFR / {content.eyebrow}</span>
      <h1>{content.title}</h1>
      <p className={styles.intro}>{content.intro}</p>
      <div className={styles.sections}>
        {content.sections.map(([heading, text], index) => (
          <article key={heading}>
            <span className="eyebrow">0{index + 1}</span>
            <div>
              <h2>{heading}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <Link className="textLink" to={page === "contact" ? "/faq" : "/catalog"}>
        {page === "contact" ? "Частые вопросы" : "Открыть каталог"}
        <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
