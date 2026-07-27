import { useEffect } from "react";
import s from "./Loader.module.scss";

const Loader = () => {
  useEffect(() => {
    const loader = document.getElementById("page-loader");
    if (!loader) return;

    const hideLoader = () => {
      loader.classList.add(s.out);
      setTimeout(() => {
        loader.style.display = "none";
      }, 520);
    };

    const showLoader = () => {
      loader.classList.remove(s.out);
      loader.style.display = "flex";
    };

    const onLoad = () => setTimeout(hideLoader, 1700);

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    const onClick = (e) => {
      const link = e.target.closest("a");
      if (
        link &&
        link.href &&
        !link.target &&
        !link.href.startsWith("javascript:") &&
        (link.origin === window.location.origin) === false // example: only external/full navigations
      ) {
        showLoader();
      }
    };

    const onSubmit = (e) => {
      if (e.defaultPrevented) return;
      showLoader();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);

    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <div id="page-loader" className={s.loading}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Loader;
