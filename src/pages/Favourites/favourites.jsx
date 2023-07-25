import React from 'react'
import style from './favourites.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, addItemToFavourites } from '../../redux/slices/userSlice'

export const Favourites = () => {
  const {favourites} = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const removeFromFav = (item) => {
    dispatch(addItemToFavourites(item))
  }

  const addToCart = (item) => {
    dispatch(addItemToCart(item))
  }


  return (
    <section className={style.favourite}>
      <h2 className={style.title}>Your favourites</h2>

      {!favourites.length ? (
        <div className={style.empty}>Here is empty</div>
      ) : (
        <>
          <div className={style.list}>
            {favourites.map((item) => {
              const {title, price, id, images, category} = item

              return (
                <div className={style.item} key={id}>
                  <div
                    className={style.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />

                  <div className={style.info}>
                    <h3 className={style.name}>{title}</h3>
                    <div className={style.category}>{category.name}</div>
                  </div>

                  <div className={style.price}>{price}$</div>

                  <button className={style.addBtn} onClick={() => addToCart(item)}>Add to cart</button>

                  <div className={style.close} onClick={() => removeFromFav(item)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}
