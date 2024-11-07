
import { Fragment } from 'react'

import { Route, Routes } from 'react-router-dom'
import ProductList from './Pages/productList/ProductList'
import ProductDetails from './Pages/productDetails/ProductDetails'
import CartList from './Pages/cartList/CartList'

function App() {


  return (
    <Fragment>
      <Routes>
        <Route path='/product-list' element={<ProductList />}/>
        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path='/cartlist' element={<CartList />} />
      </Routes>
    </Fragment>
  )
}

export default App
