import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    // При смене страницы возвращаю прокрутку и клавиатурный фокус к основному содержимому.
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return (
    <>
      <a href="#main" className="skipLink">
        К содержимому
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
