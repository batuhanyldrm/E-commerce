import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import Product from "../Product";
import Page from "../common/Page";
import LoginPage from "../LoginPage";

const RouterPage = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page component={LoginPage} title={"Home"} />}></Route>
          <Route path="/register" element={<LoginPage component={LoginPage} title={"Login"} />}></Route>
          <Route exact path="/stock" element={<Page component={Product} title={"Mevcut Stoklar"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage