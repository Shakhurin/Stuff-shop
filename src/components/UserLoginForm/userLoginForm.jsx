import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser, toggleForm } from '../../redux/slices/userSlice';
import style from './userLoginForm.module.css'


export const UserLoginForm = ({toggleCurrentFormType}) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(values).some((value) => !value)

    if(isEmpty) return
    dispatch(loginUser(values))
    dispatch(toggleForm(false))
  }

  return (
    <div className={style.wrapper}>
      <div className={style.close} onClick={() => dispatch(toggleForm(false))}>
        Close
      </div>

      <div className={style.title}>Login</div>

      <form className={style.form}>
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
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <button className={style.submit} type="submit" onClick={handleSubmit}>
          Login
        </button>

        <div className={style.link} onClick={() => toggleCurrentFormType('signup')}>Create an account</div>
      </form>
    </div>
  );
}
