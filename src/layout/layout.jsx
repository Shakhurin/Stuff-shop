import React from 'react'
import { Header } from './Header/header'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer/footer'
import style from './layout.module.css'
import { Sidebar } from '../components/Sidebar/sidebar'
import { UserForm } from '../components/UserForm/userForm'

export const Layout = () => {
  return (
    <div className={style.wrapper}>
      <Header/>
      <UserForm />
      
      <div className={style.sidebarThing}>
        <Sidebar /> 
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
