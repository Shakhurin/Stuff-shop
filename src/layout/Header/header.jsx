import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import { ReactComponent as Logo } from "../../assets/Logo/LOGO 1.svg";
import { ReactComponent as Cart } from "../../assets/ShopIcons/Cart.svg";
import { ReactComponent as Favourite } from "../../assets/ShopIcons/Favourite.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../redux/slices/userSlice";
import AVATAR from "../../assets/Avatar/avatar.svg";
import { getProductsWithParams } from "../../redux/slices/searchProductsSlice";
import { useDebounce } from "../../hooks/useDebounce";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, cart, favourites } = useSelector((state) => state.user);
  const { list, isLoading } = useSelector((state) => state.searchProducts);

  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });
  const [searchValue, setSearchValue] = useState("");

  const debounceValue = useDebounce(searchValue, 800);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate("/profile");
  };

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  useEffect(() => {
    dispatch(getProductsWithParams({ title: debounceValue }));
  }, [dispatch, debounceValue]);

  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className={style.info}>
        <div className={style.user} onClick={handleClick}>
          <div className={style.avatar}>
            <img src={values.avatar} alt="Аватар" />
          </div>
          <div className={style.userName}>{values.name}</div>
        </div>

        <form className={style.form}>
          <div className={style.search}>
            <input
              type="Search"
              name="search"
              placeholder="Search..."
              autoComplete="off"
              onChange={handleChange}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={style.box}>
              {isLoading ? (
                "Loading..."
              ) : !list.length ? (
                "No results"
              ) : (
                list.map(({ title, images, id }) => {
                  return (
                    <Link
                      to={`/product/${id}`}
                      className={style.item}
                      key={id}
                      onClick={() => setSearchValue("")}
                    >
                      <div
                        className={style.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      />
                      <div className={style.title}>{title}</div>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </form>

        <div className={style.shopIcons}>
          <Link to="/favourite">
            <Favourite className={style.icon} />
          </Link>
          {!!favourites.length && <span className={style.countOfFavourites}>{favourites.length}</span>}
          <Link to="/cart">
            <Cart className={style.icon} />
          </Link>
          {!!cart.length && <span className={style.countOfProducts}>{cart.length}</span>}
        </div>
      </div>
    </div>
  );
};
