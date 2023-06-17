import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import '../components.css';

function Cart(props) {
  const [cart, setCart] = useState(window.$cart);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      window.$cart = JSON.parse(localStorage.getItem('cart'));
      setCart(prevCart => ({ ...prevCart, ...window.$cart }));
    }

    // console.log(localStorage.getItem('cart'))

    const updateCart = () => {
      setCart(prevCart => ({ ...prevCart, ...window.$cart }));
      localStorage.setItem('cart',JSON.stringify(window.$cart));
    };

    

    window.addEventListener('cartUpdated', updateCart);
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  // useEffect(()=> {
  //   console.log(cart)
  // },[cart])

  const upperCaseFirst = (word) => {
    const array = word.split('_');
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    return (array.join(' '))
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
            Object.keys(cart).map((key) => (
              <div key={key}>
                <img src={ require(`../images/${key}.webp`) } alt='item'></img>
                <p>{upperCaseFirst(key)}: {cart[key]}</p>
              </div>
            ))
          }
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;