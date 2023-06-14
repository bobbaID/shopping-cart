import { motion, AnimatePresence } from "framer-motion"
import '../components.css';

function Cart(props) {

  const debug = () => {
    console.log(1)
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
          <button onClick={debug}>Debug</button>
          <h1>your bag</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;