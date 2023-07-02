
import { Link } from "react-router-dom";
import Cart from './components/Cart';
import Header from './components/Header';
import { useState } from 'react';

function Home() {
  const [visibleCart, setVisibleCart] = useState(false);

  const toggleCart = () => {
    setVisibleCart(!visibleCart)
  }

  return (
    <div className="App">
      <Header toggleClick={toggleCart}></Header>
      <div className='home'>
        <div className='flex-column'>
          <p>building a castle?</p>
          <p>looking for power?</p>
          <p>conquering the town?</p>
          <br/>
          <p>you came to just the right place</p>
          <br/>
          <Link to="/shop">take me</Link>
        </div>
      </div>
      <Cart toggle={toggleCart} isVisible={visibleCart}></Cart>
    </div>
  );
}

export default Home;
