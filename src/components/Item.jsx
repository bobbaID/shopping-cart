import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Cart from './Cart.jsx'
import '../components.css'

function Item() {
  const [number, setNumber] = useState(1);
  const [visibleCart, setVisibleCart] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [currentPage, setCurrentPage] = useState('');

  const toggleCart = () => {
    setVisibleCart(!visibleCart)
  }

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^[0-9]+$/.test(inputValue)) {
      setNumber(parseInt(inputValue, 10));
    } else {
      setNumber(1);
    }
  };

  const incrementNumber = () => {
    setNumber(number + 1);
  };

  const decrementNumber = () => {
    if (number > 1) setNumber(number - 1);
  };

  const addToCart = (event) => {
    event.preventDefault();

    console.log(number)
    if (!/^[0-9]+$/.test(number)) {
      alert('Invalid input. Please enter numbers only.');
    } else {
      // PLAY ADDED ANIMATION
    }
  }

  useEffect(() => {
    const pathName = window.location.pathname;
    setCurrentPage(pathName);
  }, []);

  useEffect(() => {
    if (currentPage !== '') {
      import(`../images${currentPage}.webp`)
        .then((imageModule) => {
          const src = imageModule.default;
          setImageSrc(src);
        })
        .catch((error) => {
          console.error('Error loading image:', error);
        });
    }
  }, [currentPage]);
  

  return (
    <div className="Item">
      <header className="flex-row header">
        <Link to="/">THE LAIR</Link>
        <div>
          <input type="text" placeholder="Search"></input>
          <button onClick={toggleCart}>Cart</button>
        </div>
      </header>
      <div className="flex-row item__">
        <img src={ imageSrc } alt='item'></img>
        <form className="flex-column" onSubmit={addToCart}>
          <p>Sanguine Reaper</p>
          <p>Weapon</p>
          <p>$10</p>
          <p>A two-handed weapon that deals physical damage. Has a greater effect on undead.</p>
          <div>
            <button onClick={decrementNumber}>-</button>
            <input type="number" value={number} min="1" step="1" pattern="[0-9]+" onChange={handleChange}></input>
            <button onClick={incrementNumber}>+</button>
          </div>
          <button type='submit'>Cart</button>
        </form>
      </div>
      <Cart toggle={toggleCart} isVisible={visibleCart}></Cart>
    </div>
  );
}

export default Item;