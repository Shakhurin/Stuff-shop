import React from "react";
import style from "./categories.module.css";
import { Link } from "react-router-dom";

export const Categories = ({ products = [], amount, title }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={style.section}>
      <h2 className={style.catName}>{title}</h2>

      <div className={style.list}>
        {list.map(({ id, name, image }) => {
          return (
            <Link to={`/categories/${id}`} key={id} className={style.item}>
              <div className={style.image}>
                <img src={image} alt="Картинка категории" />
              </div>
              <h3 className={style.title}>{name}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
