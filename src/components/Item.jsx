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
      setVisibleCart(!visibleCart)
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
          <button onClick={toggleCart}>
            <svg className="svg-icon" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 902.86 902.86" xmlSpace="preserve">
              <g>
                <g>
                  <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
                  <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742 C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744 s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"/>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </header>
      <div className="flex-row item__">
        <img src={ imageSrc } alt='item'></img>
        <form className="item__form" onSubmit={addToCart}>
          <button className="item__button" onClick={() => {navigate(-1)}}>back</button>
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