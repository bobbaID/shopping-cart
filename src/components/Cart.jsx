import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";
import '../components.css';

function Cart(props) {
  const [cart, setCart] = useState(window.$cart);
  const debug = () => {
    console.log(1)
  }

  const renderItems = () => {
    return (
      Object.keys(window.$cart).map((key) => (
        <p key={key}>key: {window.$cart[key]}</p>
      ))
    )
  }

  useEffect(() => {
    setCart(window.$cart);
    renderItems();
  }, []);

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
          <button onClick={debug}>Debug</button>
          <h1>your bag</h1>
          {renderItems()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;