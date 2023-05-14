import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React from 'react'
import Product from "../Product";
import Page from "../common/Page";
import LoginPage from "../LoginPage";
import AllProducts from "../AllProducts";
import SignUp from "../SignUp";

const RouterPage = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage component={LoginPage} title={"Home"} />}></Route>
          </Route>
          <Route path="/sign-up" element={<SignUp component={SignUp} title={"Home"} />}></Route>
          <Route path="/all-products" element={<AllProducts component={AllProducts} title={"AllProducts"} />}></Route>
          <Route exact path="/stock" element={<Page component={Product} title={"Mevcut Stoklar"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage