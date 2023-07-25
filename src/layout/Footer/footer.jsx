import React from 'react'
import style from './footer.module.css'
import { ReactComponent as Logo } from '../../assets/Logo/LOGO 1.svg'


export const Footer = () => {
  return (
    <div className={style.wrapper}>
      <Logo className={style.logo}/>
      <span className={style.developedBy}>Developed by <span className={style.me}>Shakhurin</span></span>
      <Logo className={style.logo}/>
    </div>
  )
}
