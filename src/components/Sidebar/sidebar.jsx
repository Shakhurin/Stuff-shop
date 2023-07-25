import React, { useEffect } from "react";
import style from "./sidebar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/slices/categorySlice";

export const Sidebar = () => {
  const { list, isLoading } = useSelector((state) => state.categories);

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCategories())
  },[dispatch])


  return (
    <div className={style.wrapper}>
      <div className={style.categories}>Categories</div>
      <nav className={style.listCats}>
        <ul>
          {!isLoading?
          list.slice(0,5).map(({ name, id }) => {
            return (
              <li key={id} className={style.category}>
                <NavLink to={`categories/${id}`}>{name}</NavLink>
              </li>
            );
          })
          : <p>Loading...</p>
        }
        </ul>
      </nav>

      <div className={style.footer}>
        <Link to="/help" className={style.helpTerms}>Help</Link>
        <Link to="/terms" className={style.helpTerms}>Terms & Conditions</Link>
      </div>
    </div>
  );
};
