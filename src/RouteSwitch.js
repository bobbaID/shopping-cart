import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Home from "./Home";
import Checkout from "./components/Checkout";
import NotFound from "./components/NotFound";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/checkout" component={<Checkout />} />
        <Route path="/:id" element={<Item />} />
        <Route component={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;