import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSignupForm } from "../UserSignupForm/userSignupForm";
import style from "./userForm.module.css";
import {toggleForm, toggleFormType} from '../../redux/slices/userSlice'
import { UserLoginForm } from "../UserLoginForm/userLoginForm";

export const UserForm = () => {
  const { showForm,formType } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const toggleCurrentFormType = (type) =>{
    dispatch(toggleFormType(type))
  }

  return showForm ? (
    <>
      <div
        className={style.overlay}
        onClick={() => dispatch(toggleForm(false))}
      />
      {formType === 'signup' ? <UserSignupForm toggleCurrentFormType={toggleCurrentFormType}/> : <UserLoginForm toggleCurrentFormType={toggleCurrentFormType}/>}
    </>
  ) : (
    <></>
  );
};
