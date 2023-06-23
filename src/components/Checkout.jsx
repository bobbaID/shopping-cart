import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
  const [cart, setCart] = useState(window.$cart);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      window.$cart = JSON.parse(localStorage.getItem('cart'));
      setCart(prevCart => ({ ...prevCart, ...window.$cart }));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart));
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
        updatedCart[key] -= 1;
      } else {
        updatedCart[key] += 1;
      }
      return updatedCart;
    });
  }

  function modifyItem(value, key) {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[key] = parseInt(value)
      return updatedCart;
    });
  }

  return (
    <div className="App">
      <header className="flex-row header">
        <Link to="/">THE LAIR</Link>
      </header>
      <button onClick={() => {navigate(-1)}}>Back</button>
      <div>
        { 
          Object.keys(window.$cart).map((key) => (
            <div key={key} className="cart__item flex-row">
              {/* <button onClick={() => {removeItem(key)}}>X</button> */}
              <img src={ require(`../images/${key}.webp`) } alt='item'></img>
              <p style={{ margin:'0 1em'}}>{upperCaseFirst(key)}:</p>
              <button onClick={() => {increment(key, true)}}>-</button>
              <input type="number" value={cart[key]} onChange={(e) => {modifyItem(e.target.value, key)}} style={{ margin:'0 0.5em'}}/>
              <button onClick={() => {increment(key, false)}}>+</button>
            </div>
          ))
        }
      </div>
      </div>
  );
}
  
export default Checkout;