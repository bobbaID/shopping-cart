import { useEffect, useState } from "react";
import { itemDictData } from './Data.js';
import Header from "./Header.jsx";

function Checkout() {
  const [cart, setCart] = useState(window.$cart);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      window.$cart = JSON.parse(localStorage.getItem('cart'));
      setCart(prevCart => ({ ...prevCart, ...window.$cart }));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(window.$cart));
  },[cart])

  const upperCaseFirst = (word) => {
    const array = word.split('_');
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    return (array.join(' '))
  }

  function increment(key, negative) {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (negative) {
        if (updatedCart[key] > 1) {
          updatedCart[key] -= 1;
        } else {
          delete window.$cart[key]
          delete updatedCart[key];
        }
      } else {
        updatedCart[key] += 1;

        if (updatedCart[key] > 999) {
          updatedCart[key] = 999
        }
      }
      window.$cart = updatedCart;
      return updatedCart;
    });
  }

  function modifyItem(value, key) {
    if (!/[0-9]/.test(value.slice(-1))) {
      value = value.slice(0, value.length - 1);
    }
    
    if (value === '' || value === '0') {
      value = 1;
    }

    if (value > 999) {
      value = 999
    }

    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[key] = parseInt(value);
      window.$cart = updatedCart;
      return updatedCart;
    });
  }

  function deleteItem(key) {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete window.$cart[key]
      delete updatedCart[key];
      return updatedCart;
    })
  }

  function calculateCost() {
    let cost = 0;
    for (let key in window.$cart) {
      if (!isNaN(parseInt(itemDictData[key].Price))) {
        cost += (parseInt(itemDictData[key].Price) * window.$cart[key])
      }
    }

    return (cost);
  }

  const calculateItem = () => {
    let number = 0;
    for (let key in window.$cart) {
      if (!isNaN(parseInt(itemDictData[key].Price))) {
        number += window.$cart[key];
      }
    }

    return (`${number} ${number > 1 ?  'Items' : 'Item'}`)
  }

  return (
    <div className="App flex-column">
      <Header></Header>
      <div className="checkout flex-column">
        <div className="checkout__category flex-row">
        <p>Product</p>
        <p>Unit Price</p>
        <p>Quantity</p>
        <p>Total Price</p>
        <p>Actions</p>
        </div>
        { 
          Object.keys(window.$cart).map((key) => (
            <div key={key} className="cart__item flex-row">
              {/* <button onClick={() => {removeItem(key)}}>X</button> */}
              <img src={ require(`../images/${key}.webp`) } alt='item'></img>
              <p style={{ margin:'0 1em'}}>{upperCaseFirst(key)}</p>
              <p>{(itemDictData[key].Price)} C</p>
              <button onClick={() => {increment(key, true)}}>−</button>
              <input 
                type="number" 
                value={cart[key]}
                onChange={(e) => {modifyItem(e.target.value, key)}} 
                style={{ margin:'0 0.5em'}}
              />
              <button onClick={() => {increment(key, false)}}>+</button>
              <p>{(itemDictData[key].Price) * window.$cart[key]} C</p>
              <button onClick={() => {deleteItem(key)}}>Delete</button>
            </div>
          ))
        }
      </div>
      <div className="checkout__footer flex-row">
        <p className="checkout__cost">Total: {calculateCost()} C ({calculateItem()})</p>
        <button className="checkout__button">check out</button>
      </div>
      </div>
      
  );
}
  
export default Checkout;