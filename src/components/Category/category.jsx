import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./category.module.css";
import { getProductsWithParams } from "../../redux/slices/searchProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Products } from "../Products/products";

export const Category = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { list, isLoading } = useSelector((state) => state.searchProducts);
  const category = useSelector((state) => state.categories);

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [cat, setCat] = useState("");
  const [params, setParams] = useState(defaultParams);
  const [values, setValues] = useState(defaultValues);
  const [items, setItems] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (id) dispatch(getProductsWithParams(params));
  }, [dispatch, id, params]);

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues);
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !category.list.length) return;

    const { name } = category.list.find((item) => item.id === id * 1);

    setCat(name);
  }, [category.list, id]);

  useEffect(() => {
    if (isLoading) return;

    if (!list.length) return setIsEnd(true);

    setItems((_items) => [..._items, ...list]);
  }, [isLoading, list]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setIsEnd(false);
  };

  return (
    <section className={style.wrapper}>
      <h2 className={style.title}>{cat}</h2>

      <form className={style.filters} onSubmit={handleSubmit}>
        <div className={style.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>
        <div className={style.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={style.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className={style.preloader}>Loading...</div>
      ) : !items.length ? (
        <div className={style.back}>
          <span>No results</span>
          <button className={style.btn} onClick={handleReset}>
            Reset
          </button>
        </div>
      ) : (
        <Products
          title={""}
          products={items}
          amount={items.length}
          style={{ padding: 0 }}
        />
      )}

      {!isEnd && (
        <div className={style.more}>
          <button
            className={style.btn}
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
};
