import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../redux/slices/singleProductSlice";
import { Product } from "../../components/Product/product";
import { Products } from "../../components/Products/products";
import { getRelatedProducts } from "../../redux/slices/productsSlcie";

export const SingleProduct = () => {
  const { data, isLoading } = useSelector((state) => state.singleProduct);
  const {related, list} = useSelector((state) => state.products)
  
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      return
    }
    dispatch(getSingleProduct(id));
  }, [dispatch, id, isLoading]);
  
  useEffect(()=>{
    if(!list.length > 0 || !Object.keys(data).includes('id')) return
    dispatch(getRelatedProducts(data.category.id)) 
  },[data, dispatch, list.length])

  return !data ?(
    <section>Loading...</section>
  )
    :(
      <>
        <Product id={id} data={data} isLoading={isLoading} />
        <Products products={related} amount={5} title={'Related products'}/>
      </>
  );
};
