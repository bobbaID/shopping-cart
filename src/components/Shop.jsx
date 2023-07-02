import '../index.css';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { itemDictData } from './Data.js';
import Cart from './Cart.jsx';
import Header from './Header.jsx';

function Shop(props) {
  const [visibleCart, setVisibleCart] = useState(false);
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(part => part !== '');
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
      <Header toggleClick={toggleCart}></Header>
      <div className='page flex-row'>
        <div className='filter-list'>
          <h2>shop / {subDirectory === null ? 'all' : subDirectory}</h2>
          <button onClick={() => handleLinkClick('weapon')} style={{color: subDirectory === 'weapon' ? 'white' : '#696969'}}>weapon</button>
          <button onClick={() => handleLinkClick('equipment')} style={{color: subDirectory === 'equipment' ? 'white' : '#696969'}}>equipment</button>
          <button onClick={() => handleLinkClick('resource')} style={{color: subDirectory === 'resource' ? 'white' : '#696969'}}>resource</button>
          <button onClick={() => handleLinkClick('consumable')} style={{color: subDirectory === 'consumable' ? 'white' : '#696969'}}>consumable</button>
          <button onClick={() => handleLinkClick('gem')} style={{color: subDirectory === 'gem' ? 'white' : '#696969'}}>gem</button>
        </div>
        <div className='shop__body flex-column'>
          <div className='catalogue'>
            { itemDictData && 
              Object.keys(itemDictData).map((key) => {
                console.log(key)
                if (subDirectory) {
                  if (itemDictData[key].Type.toLowerCase() !== subDirectory) return null;
                }
                return (
                  <div key={key}>
                    <Link to={`/${key}`}>
                      <img src={require(`../images/${key}.webp`)} alt='item'></img>
                      <p>{ itemDictData[key].Name }</p>
                      <p>{ itemDictData[key].Price } C</p>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Cart toggle={toggleCart} isVisible={visibleCart}></Cart>
      </div>
    </div>
  );
}

export default Shop;