import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { itemDictData } from './Data.js';
import Cart from './Cart.jsx';
import '../components.css';

const Item = () => {
  const [number, setNumber] = useState(1);
  const [visibleCart, setVisibleCart] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [itemData, setItemData] = useState({});
  const [currentPage, setCurrentPage] = useState('');

  const navigate = useNavigate();

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
    if (!/^[0-9]+$/.test(number)) {
      alert('Invalid input. Please enter numbers only.');
    } else {
      // PLAY ADDED ANIMATION
      let itemName = currentPage;
      if (!((itemName) in window.$cart)) {
        window.$cart[itemName] = number;
      } else {
        window.$cart[itemName] += number;
      }
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }

  useEffect(() => {
    const pathName = window.location.pathname;
    setCurrentPage(pathName.replace('/',''));
  }, []);

  useEffect(() => {
    if (currentPage !== '') {
      if (currentPage in itemDictData) {
        import(`../images/${currentPage}.webp`)
          .then((imageModule) => {
            const src = imageModule.default;
            setImageSrc(src);
          })
          .catch((error) => {
            console.error('Error loading image:', error);
          });
          setItemData(itemDictData[currentPage]);
      } else {
        navigate('/404', { replace: true });
      }
    }
  }, [currentPage, navigate]);


  return (
    <div className="Item">
      <header className="flex-row header">
        <Link to="/">THE LAIR</Link>
        <div>
          <input type="text" placeholder="Search"></input>
          <button onClick={toggleCart}>Cart</button>
        </div>
      </header>
      <button onClick={() => {navigate(-1)}}>Back</button>
      <div className="flex-row item__">
        <img src={ imageSrc } alt='item'></img>
        <form className="flex-column" onSubmit={addToCart}>
          { itemData &&
            <>
              <p>{itemData.Name}</p>
              <p>{itemData.Type}</p>
              <p>${itemData.Price}</p>
              <p>{itemData.Desc}</p>
            </>
          }
          <div>
            <button type='button' onClick={decrementNumber}>-</button>
            <input type="number" value={number} min="1" step="1" pattern="[0-9]+" onChange={handleChange}></input>
            <button type='button' onClick={incrementNumber}>+</button>
          </div>
          <button type='submit'>Cart</button>
        </form>
      </div>
      <Cart toggle={toggleCart} isVisible={visibleCart}></Cart>
    </div>
  );
}

export default Item;