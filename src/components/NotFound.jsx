import Header from './Header';
import Cart from './Cart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [visibleCart, setVisibleCart] = useState(false);

  const toggleCart = () => {
    setVisibleCart(!visibleCart)
  }

  const navigate = useNavigate();

  return (
    <div className="App">
      <Header toggleClick={toggleCart}></Header>
      <div className='not-found'>
        <div className='flex-column'>
          <p> 404 </p>
          <br/>
          <p> page not found </p>
          <button onClick={() => {navigate(-1)}}>
            <span style={{ color:'#598B9Eff' } }>return</span>
          </button>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
      <Cart toggle={toggleCart} isVisible={visibleCart}></Cart>
    </div>
  );
}

export default Checkout;
