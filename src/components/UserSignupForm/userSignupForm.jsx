import React, { useState } from "react";
import style from "./userSignupForm.module.css";
import { useDispatch } from "react-redux";
import { createUser, toggleForm } from "../../redux/slices/userSlice";

export const UserSignupForm = ({toggleCurrentFormType}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(values).some((value) => !value)

    if(isEmpty) return
    dispatch(createUser(values))
    dispatch(toggleForm(false))
  }

  return (
    <div className={style.wrapper}>
      <div className={style.close} onClick={() => dispatch(toggleForm(false))}>
        Close
      </div>

      <div className={style.title}>Sign Up</div>

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

        <button className={style.submit} type="submit" onClick={handleSubmit}>
          Create an account
        </button>

        <div className={style.link} onClick={() => toggleCurrentFormType('login')}>I already have an account</div>
      </form>
    </div>
  );
};
