import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { itemDictData } from './Data.js';

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

  return (
    <div className="App">
      <header className="flex-row header">
        <Link to="/">THE LAIR</Link>
        <Link to="/shop">products</Link>
      </header>
      <div className="checkout flex-column">
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
      <p>Cost: {calculateCost()} C</p>
      <button>Checkout</button>
      </div>
  );
}
  
export default Checkout;