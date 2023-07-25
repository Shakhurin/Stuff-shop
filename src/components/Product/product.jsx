import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./product.module.css";
import { addItemToCart, addItemToFavourites, } from "../../redux/slices/userSlice";

const SIZES = [4, 4.5, 5];

export const Product = ({data, id, isLoading}) => {
  const [currentSize, setCurrentSize] = useState()
  const [currentImg, setCurrentImg] = useState()

  const dispatch = useDispatch();

  const purchased = useMemo(() => {
    return Math.floor(Math.random()*20 + 1)
  },[id])
  

  const addToCart = () => {
    dispatch(addItemToCart(data))
  }

  const addToFav = () => {
    dispatch(addItemToFavourites(data))
  }

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setCurrentImg(data.images[0])
    }
  }, [data, id, dispatch, isLoading, setCurrentImg]);

    console.log(data);

  if (!isLoading && Object.keys(data).length > 0) {
    return (
      <section className={style.product}>
        <div className={style.images}>
          <div
            className={style.current}
            style={{ backgroundImage: `url(${currentImg})` }}
          />
          <div className={style.imagesList}>
            {data.images.map((images, i) => {
              return (
                <div
                className={style.image}
                key={i}
                style={{ backgroundImage: `url(${images})` }}
                onClick={() => setCurrentImg(images)}
                />
                );
              })}
          </div>
        </div>

        <div className={style.info}>
          <h1 className={style.title}>{data.title}</h1>
          <div className={style.price}>{data.price}$</div>
          <div className={style.color}>
            <span>Color:</span> Blanc
          </div>
          <div className={style.sizes}>
            <span>Size:</span>

            <div className={style.list}>
              {SIZES.map((size) => {
                return <div
                  onClick={() => setCurrentSize(size)}
                  className={`${style.size}  ${currentSize === size ? style.active : ''}`}
                  key={size}
                >
                  {size}
                </div>;
              })}
            </div>
          </div>

          <p className={style.description}>{data.description}</p>
          <div className={style.actions}>
            <button onClick={addToCart} className={style.add} disabled={!currentSize}>Add to cart</button>
            <button onClick={addToFav} className={style.favourite}>Add to favourite</button>
          </div>

          <div className={style.bottom}>
              <div className={style.purchase}>
                {purchased} people purchased
              </div>
              <Link to={'/'}>Return to store</Link>
          </div>
        </div>
      </section>
    );
  } else {
    return <div className={style.loading}>Loading...</div>;
  }
};
