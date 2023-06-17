import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Home from "./Home";
import Checkout from "./components/Checkout";
import NotFound from "./components/NotFound";

import './fonts/Nocturne-Light.otf';
import './fonts/Nocturne-Medium.otf';
import './fonts/Volkhov-Regular.ttf';

const RouteSwitch = () => {
  window.$cart = {}

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route exact path="/contact" element={<Home />} />
        <Route exact path="/checkout" component={<Checkout />} />
        <Route path="/:id" element={<Item />} />
        <Route path="/404" component={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;