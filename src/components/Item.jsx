import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { itemDictData } from './Data.js';
import Cart from './Cart.jsx';
import Header from './Header';
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
      if (parseInt(inputValue, 10) > 999) {
        setNumber(999);
      } else {
        setNumber(parseInt(inputValue, 10));
      }
    } else {
      setNumber(1);
    }
  };

  const incrementNumber = () => {
    if (number + 1 > 999) {
      setNumber(999);
    } else {
      setNumber(number + 1);
    }
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
        if (window.$cart[itemName] > 999) {
          window.$cart[itemName] = 999;
        }
      }
      window.dispatchEvent(new Event('cartUpdated'));
      setVisibleCart(!visibleCart)
    }
  }

  useEffect(() => {
    const pathName = ((window.location.href).split("/")).pop();
    setCurrentPage(pathName.replace('/',''));
  }, []);

  useEffect(() => {
    if (currentPage !== '') {
      console.log(currentPage)
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
    <div className="Item flex-column">
      <Header toggleClick={toggleCart}></Header>
      <div className="flex-row item__">
        <img src={ imageSrc } alt='item'></img>
        <form className="item__form" onSubmit={addToCart}>
          <button className="item__button" onClick={() => {navigate(-1)}}>{'<'} back</button>
          { itemData &&
            <>
              <p>{itemData.Name}</p>
              <p>{String(itemData.Type).toLowerCase()}</p>
              <p>{itemData.Price} C</p>
              <p>{itemData.Desc}</p>
            </>
          }
          <div className='flex-row'>
            <button type='button' onClick={decrementNumber}>−</button>
            <input type="number" value={number} min="1" step="1" pattern="[0-9]+" onChange={handleChange}></input>
            <button type='button' onClick={incrementNumber}>+</button>
          </div>
          <button type='submit'>add to cart</button>
        </form>
      </div>
      <Cart toggle={toggleCart} isVisible={visibleCart}></Cart>
    </div>
  );
}

export default Item;