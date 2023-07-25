import React from "react";
import style from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sumBy } from "../../utils/funcs";
import { addItemToCart, removeItemFromCart } from "../../redux/slices/userSlice";

export const Cart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.user);

  const changeQuantity = ( item, quantity ) => [
    dispatch(addItemToCart({...item,quantity}))
  ]

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item))
  }

  return (
    <section className={style.cart}>
      <h2 className={style.title}>Your cart</h2>

      {!cart.length ? (
        <div className={style.empty}>Here is empty</div>
      ) : (
        <>
        <div className={style.list}>
          {cart.map((item) => {
            const { title, category, images, price, id, quantity } = item;

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

                <div className={style.quantity}>
                  <div className={style.minus} onClick={() => changeQuantity(item, Math.max(1,quantity-1))}>-</div>

                  <span>{quantity}</span>

                  <div className={style.plus} onClick={() => changeQuantity(item, quantity+1)}>+</div>
                </div>

                <div className={style.total}>{quantity*price}$</div>

                <div className={style.close} onClick={() => removeItem(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className={style.actions}>
          <div className={style.total}>
            TOTAL PRICE: {' '}
            <span>
              {sumBy(cart.map(({quantity, price}) => quantity * price))}$
            </span>
          </div>

          <button className={style.proceed}>Proceed to checkout</button>
        </div>
        </>
      )}
    </section>
  );
};
