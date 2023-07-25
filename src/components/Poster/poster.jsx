import React from 'react'
import style from './poster.module.css'
import PC from '../../assets/Poster/image 1.png'

export const Poster = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.title}>BIG SALE 20%</div>
      <div className={style.product}>
        <div className={style.text}>
          <div className={style.subtitle}>The bestseller of 2023</div>
          <h1 className={style.head}>Lennon R2DR with NVIDIA 5090 TI</h1>
          <button className={style.button}>Shop now</button>
        </div>
        <div className={style.image}>
          <img src={PC} alt="Компик тут игровой" className={style.img}/>
        </div>
      </div>
    </section>
  )
}
