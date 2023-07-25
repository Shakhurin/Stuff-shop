import React, { useEffect } from "react";
import { Products } from "../../components/Products/products";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../../components/Categories/categories";
import { Poster } from "../../components/Poster/poster";
import { Banner } from "../../components/Banner/banner";
import { filterByPrice } from "../../redux/slices/productsSlcie";

export const Home = () => {
  const dispatch = useDispatch();

  const { list, filtered, isLoading } = useSelector((state) => state.products);
  const catList = useSelector((state) => state.categories);

  console.log(catList);

  useEffect(() => {
    if (!list.length) {
      return;
    }
    dispatch(filterByPrice(100));
  }, [list.length, dispatch]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={catList.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less than 100$" />
    </>
  );
};
