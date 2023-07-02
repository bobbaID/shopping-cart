import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Home from "./Home";
import Contact from "./Contact";
import Checkout from "./components/Checkout";
import NotFound from "./components/NotFound";

import './fonts/Nocturne-Light.otf';
import './fonts/Nocturne-Medium.otf';
import './fonts/Volkhov-Regular.ttf';

const RouteSwitch = () => {
  window.$cart = {}

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route path="/:id" element={<Item />} />
        {/* <Route exact path="/404" element={<NotFound />} /> */}
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;