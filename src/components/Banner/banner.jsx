import React from 'react'
import style from './banner.module.css'
import BANNER from '../../assets/Banner/Rectangle 14.png'

export const Banner = () => {
  return (
    <section className={style.banner}>
      <div className={style.left}>
        <p className={style.content}>
          NEW YEAR
          <span className={style.sale}>SALE</span>
        </p>
        <button className={style.more}>See more</button>
      </div>

      <div className={style.right}>
        <img src={BANNER} alt="" className={style.img}/>
        <p className={style.discount}>
          save up to <span className={style.percent}>50%</span> off
        </p>
      </div>
    </section>
  )
}
