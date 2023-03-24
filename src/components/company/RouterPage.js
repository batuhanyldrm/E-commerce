import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import Product from "../Product";
import Page from "../common/Page";
import LoginPage from "../LoginPage";
import AllProducts from "../AllProducts";

const RouterPage = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage component={LoginPage} title={"Home"} />}></Route>
          <Route path="/allProducts" element={<AllProducts component={LoginPage} title={"AllProducts"} />}></Route>
          <Route exact path="/stock" element={<Page component={Product} title={"Mevcut Stoklar"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage