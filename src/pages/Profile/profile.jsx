import React, { useEffect, useState } from 'react'
import style from './profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'

export const Profile = () => {
  const {currentUser} = useSelector(state => state.user)
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  useEffect(()=>{
    if(!currentUser) return
    setValues(currentUser)
  },[currentUser])

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(values).some((value) => !value)

    if(isEmpty) return
    dispatch(updateUser(values))
  }

  return (
    <section className={style.profile}>
      {!currentUser ? <span>You need to login</span> : (
        <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.group}>
          <input
            type="name"
            placeholder="Your name"
            name="name"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.group}>
          <input
            type="avatar"
            placeholder="Your avatar"
            name="avatar"
            value={values.avatar}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit' className={style.submit}>
          Update
        </button>
      </form>
      )}
    </section>
  )
}
