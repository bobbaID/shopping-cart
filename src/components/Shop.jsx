import '../index.css';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { itemDictData } from './Data.js';
import Cart from './Cart.jsx';

function Shop(props) {
  const [visibleCart, setVisibleCart] = useState(false);
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(part => part !== ''); // Split path by '/' and remove empty parts
  const subDirectory = pathParts.length > 1 ? pathParts.pop() : null;

  const navigate = useNavigate();

  useEffect(() => {
  },[])

  const toggleCart = () => {
    setVisibleCart(!visibleCart)
  }

  const handleLinkClick = (clickDir) => {
    if (subDirectory === clickDir) {
      navigate('/shop');
    } else {
      navigate(`/shop/${clickDir}`);
    }
  };

  return (
    <div className="App">
      <header className="flex-row header">
        <Link to="/">THE LAIR</Link>
        <div>
          <input type="text" placeholder="Search"></input>
          <button onClick={toggleCart}>Cart</button>
        </div>
      </header>
      <div className='page flex-row'>
        <div className='filter-list flex-column'>
          <h2>shop / {subDirectory === null ? 'all' : subDirectory}</h2>
          <button onClick={() => handleLinkClick('gem')}>gems</button>
          <button onClick={() => handleLinkClick('equipment')}>equipment</button>
          <button onClick={() => handleLinkClick('weapon')}>weapons</button>
          <button onClick={() => handleLinkClick('consumable')}>consumables</button>
          <button onClick={() => handleLinkClick('resource')}>resources</button>
        </div>
        <div className='catalogue'>
          { itemDictData && 
            Object.keys(itemDictData).map((key) => {
              if (subDirectory) {
                if (itemDictData[key].Type.toLowerCase() !== subDirectory) return null;
              }

              return (
                <div key={key}>
                  <Link to={`/${key}`}>
                    <img src={ require(`../images/${key}.webp`) } alt='item'></img>
                    <h2>{ itemDictData[key].Name }</h2>
                    <h3>${ itemDictData[key].Price }</h3>
                  </Link>
                </div>
              )
            })
          }
        </div>
        <Cart toggle={toggleCart} isVisible={visibleCart}></Cart>
      </div>
    </div>
  );
}

export default Shop;