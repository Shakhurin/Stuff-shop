import './App.css';
import { Layout } from './layout/layout';
import style from '../src/App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from './redux/slices/categorySlice';
import { getProducts } from './redux/slices/productsSlcie';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <Layout classname={style.layout}/>
  );
}

export default App;
