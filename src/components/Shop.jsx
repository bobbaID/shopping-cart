import '../index.css';
import reaper from '../images/reaper.webp';

function Shop() {
  return (
    <div className="App">
      <header className="flex-row header">
        <h1>THE LAIR</h1>
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
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
          <div>
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
          <div>
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
          <div>
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
          <div>
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
          <div>
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
          <div>
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
          <div>
            <img src={ reaper } alt='item'></img>
            <h3>$100</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;