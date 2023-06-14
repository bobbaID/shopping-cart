import '../index.css';
import reaper from '../images/reaper.webp';
import sword from '../images/sword.webp';
import spear from '../images/spear.webp';
import { Link } from "react-router-dom";

function Shop() {
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
          <div>
            <Link to={`/reaper`}>
              <img src={ reaper } alt='item'></img>
              <h3>$100</h3>
            </Link>
          </div>
          <div>
            <Link to={`/sword`}>
              <img src={ sword } alt='item'></img>
              <h3>$100</h3>
            </Link>
          </div>
          <div>
            <Link to={`/spear`}>
              <img src={ spear } alt='item'></img>
              <h3>$100</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;