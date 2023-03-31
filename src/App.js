import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Alert } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { fetchProducts } from './redux/thunks';
import { getMessage } from './redux/selectors';
import { clearMessage } from './redux/productsSlice'

// import pages
import NavMenu from './components/NavMenu/NavMenu';
import Home from './Pages/Home/Home';
import ProductsAddingForm from './Pages/ProductsAddingForm/ProductsAddingForm'
import Product from './Pages/ProductCard/ProductCard';

// import styles
import './App.css';

function App() {
  const message = useSelector(getMessage)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
          dispatch(clearMessage())
      }, 2500)
    }
  })

  const isExtraSmallScreen = useMediaQuery({
    query: '(min-width: 321px)'
  })
  return (
    <div className="App">
      <Layout className="layout">
        <Layout.Header className='header'>
          {isExtraSmallScreen &&
            <div className="logo" />
          }
          <NavMenu />
        </Layout.Header>
        <Layout.Content className='content-wrapper'>
          {message && <Alert message={message} type={message === 'Операція успішна' ? 'success' : 'error'} showIcon />}
          <Routes>
            <Route index element={<Home />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/add-product" element={<ProductsAddingForm />} />
            <Route path="/edit-product/:productId" element={<ProductsAddingForm editMode />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Layout.Content>
        <Layout.Footer className='footer'>My App ©2023 Created by Kocehtov R</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
