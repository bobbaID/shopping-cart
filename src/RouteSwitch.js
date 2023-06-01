import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Home from "./Home";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/cart" component={<Cart />} />
        <Route component={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;