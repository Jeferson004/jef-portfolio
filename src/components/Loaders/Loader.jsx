import s from "./Loader.module.scss";

const loader = () => {
  return (
    <div className={s.loading}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default loader;
