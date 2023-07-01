import './Home.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="flex-row header " style={{ gap:'11% '}}>
        <Link to="/">THE LAIR</Link>
        <Link to="/contact">contact</Link>
      </header>
      <div className='home'>
        <div className='flex-column'>
          <p>building a castle?</p>
          <p>looking for power?</p>
          <p>conquering the town?</p>
          <br/>
          <p>you came to just the right place</p>
          <br/>
          <Link to="/shop">take me</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
