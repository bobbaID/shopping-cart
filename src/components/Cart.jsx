import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { itemDictData } from './Data.js';
import '../components.css';

function Cart(props) {
  const [cart, setCart] = useState(window.$cart);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      window.$cart = JSON.parse(localStorage.getItem('cart'));
      setCart(prevCart => ({ ...prevCart, ...window.$cart }));
    }

    const updateCart = () => {
      setCart(prevCart => ({ ...prevCart, ...window.$cart }));
      localStorage.setItem('cart',JSON.stringify(window.$cart));
    };

    window.addEventListener('cartUpdated', updateCart);
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const removeItem = (item) => {
    if (window.$cart[item] !== undefined) {
      delete window.$cart[item];
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }

  const upperCaseFirst = (word) => {
    const array = word.split('_');
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    return (array.join(' '))
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
    <AnimatePresence>
      {props.isVisible && (
        <motion.div
         className="cart"
         initial={{ x: '100%' }}
         animate={{ x: '0%' }}
         exit={{ x: '100%' }}
         transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <button onClick={props.toggle}>X</button>
          <h1>your bag</h1>
          { 
            Object.keys(window.$cart).map((key) => (
              <div key={key} className="cart__item flex-row">
                <button onClick={() => {removeItem(key)}}>X</button>
                <img src={ require(`../images/${key}.webp`) } alt='item'></img>
                <p>{upperCaseFirst(key)}: {cart[key]}</p>
              </div>
            ))
          }
          <p>Cost: ${calculateCost()}</p>
          <Link to="/checkout">Checkout</Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;