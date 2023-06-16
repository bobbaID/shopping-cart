import '../index.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { itemDictData } from './Data.js';

function Shop(props) {

  useEffect(() => {
  },[])

  return (
    <div className="App">
      <header className="flex-row header">
        <Link to="/">THE LAIR</Link>
        <div>
          <input type="text" placeholder="Search"></input>
          <button>Cart</button>
        </div>
      </header>
      <div className='page flex-row'>
        <div className='filter-list flex-column'>
          <h2>shop / all</h2>
          <button>gems</button>
          <button>equipment</button>
          <button>weapons</button>
          <button>consumables</button>
          <button>resources</button>
        </div>
        <div className='catalogue'>
          { itemDictData && 
            Object.keys(itemDictData).map((key) => (
              <div key={key}>
                <Link to={`/${key}`}>
                  <img src={ require(`../images/${key}.webp`) } alt='item'></img>
                  <h2>{ itemDictData[key].Name }</h2>
                  <h3>${ itemDictData[key].Price }</h3>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Shop;