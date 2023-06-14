import '../index.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

function Shop() {
  const [itemDict, setItemDict] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const itemDictData = {
        1:{Name:'Sanguine Reaper', Price:'200', Type:'Weapon', Desc:'A two-handed weapon that deals physical damage. Has a greater effect on undead.'},
        2:{Name:'Iron Sword', Price:'100', Type:'Weapon', Desc:''},
        3:{Name:'Copper Spear', Price:'50', Type:'Weapon', Desc:''},
      }

      const updatedItemDict = { ...itemDictData };

      for (let key in itemDictData) {
        try {
          const imagePath = `../images/${itemDictData[key].Name.toLowerCase().replace(' ', '_')}.webp`;
          const imageModule = await import(imagePath);
          updatedItemDict[key].Source = imageModule.default;
        } catch (error) {
          console.error(`Error loading image for key ${key}:`, error);
        }
      }

      setItemDict(updatedItemDict);
    };

    fetchData();
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
          { itemDict &&
            Object.keys(itemDict).map((key) => (
              <div key={key}>
                <Link to={`/${(itemDict[key].Name).toLowerCase().replace(' ','_')}`}>
                  <img src={ require(itemDict[key].Source) } alt='item'></img>
                  <h2>{ itemDict[key].Name }</h2>
                  <h3>${ itemDict[key].Price }</h3>
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