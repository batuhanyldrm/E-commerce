import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from 'react'
import Product from "../companyProducts/Product";
import Page from "../common/Page";
import LoginPage from "../LoginPage";
import AllProducts from "../AllProducts";
import SignUp from "../SignUp";
import ProductDetails from "../ProductDetails";
import Profile from "../user/Profile"

const RouterPage = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage component={LoginPage} title={"Home"} />}></Route>
          </Route>
          <Route path="/sign-up" element={<SignUp component={SignUp} title={"Home"} />}></Route>
          <Route path="/all-products" element={<AllProducts component={AllProducts} title={"All Products"} />}></Route>
          <Route exact path="/stock" element={<Page component={Product} title={"Current Stock"} />}></Route>
          <Route exact path="/product-details/:id" element={<ProductDetails component={ProductDetails} title={"Product Details"} />}></Route>
          <Route exact path="/profile" element={<Profile component={ProductDetails} title={"Profile"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage