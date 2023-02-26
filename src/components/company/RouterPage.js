import { BrowserRouter, HashRouter, Route, Routes, Switch } from "react-router-dom";
import React from 'react'
import LeftDrawer from "./LeftDrawer";
import Product from "../Product";
import Page from "../common/Page";

const RouterPage = () => {
  return (
    <BrowserRouter>
    <LeftDrawer/>
        <Routes>
          <Route path="/" element={<div>faruk gay</div>}></Route>
          <Route exact path="/stock" element={<Page component={Product} title={"Mevcut Stoklar"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage