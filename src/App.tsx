// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutClient from './layout/Client'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import DetailPage from './pages/DetailPage'
import Register from './layout/Auths/Register'
import Login from './layout/Auths/Login'
import LayoutAdmin from './layout/Admin'
import ProductAdd from './pages/dashboard/product/ProductAdd'
import ProductUpdate from './pages/dashboard/product/ProductUpdate'
import ProductList from './pages/dashboard/product/ProductList'
import ContactPage from './pages/ContactPage'
// import Sidebar from './layout/Admin/Sidebar'

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<LayoutClient/>}>
          <Route index element={<HomePage/>}/>
          <Route path='shop' element={<ShopPage/>}/>
          <Route path='detail/:id' element={<DetailPage/>}/>
          <Route path='cart' element={<CartPage/>}/>
          <Route path='cart/checkout' element={<CheckoutPage/>}/>
          <Route path='about' element={<AboutPage/>}/>
          <Route path='contact' element={<ContactPage/>}/>
        </Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<LayoutAdmin/>}>
          <Route path='products/add' element={<ProductAdd />}/>
          <Route path='products/update/:id' element={<ProductUpdate/>}/>
          <Route path='products' element={<ProductList/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
