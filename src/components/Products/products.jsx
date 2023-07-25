import React from "react";
import style from "./products.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleProduct } from "../../redux/slices/singleProductSlice";


export const  Products = ({ title, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(getSingleProduct(id))
  }
  // Подумать о диспатче при переходе в Products и при переходе на страницу товара 

  
  return (
    <section className={style.products}>
      {title && <h2 className={style.blockName}>{title}</h2>}

      <div className={style.list}>
        {list.map(({ id, images, title, price, category: { name: cat } },index) => {
          return (
            <Link key={index} to={`/product/${id}`} className={style.product} onClick={handleClick}>
              <div className={style.image}>
                <img src={images[0]} alt="Картинка должна быть" className={style.imgitself}/>
              </div>
              <div className={style.wrapper}>
                <p className={style.title}>{title}</p>
                <div className={style.cat}>{cat}</div>
                <div className={style.info}>
                  <div className={style.prices}>
                    <div className={style.price}>{price}$</div>
                    <div className={style.oldPrice}>
                      {Math.floor(price * 0.8)}$
                    </div>
                  </div>

                  <div className={style.purchases}>
                    {Math.floor(Math.random() * 20 + 1)} purchased
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
