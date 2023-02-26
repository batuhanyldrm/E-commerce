import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import LeftDrawer from "./LeftDrawer";
import Product from "../Product";
import Page from "../common/Page";
import LoginPage from "../LoginPage";

const RouterPage = () => {
  return (
    <BrowserRouter>
    <LeftDrawer/>
        <Routes>
          <Route path="/" element={<Page component={LoginPage} title={"Login"} />}></Route>
          <Route exact path="/stock" element={<Page component={Product} title={"Mevcut Stoklar"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage