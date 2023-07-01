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
        <p>looking for power?</p>
        <p>building a castle?</p>
        <p>conquering the town?</p>
        <br/>
        <p>you came to just the right place</p>
        <p>we provide services to all aspiring vampires</p>
        <p>a world consumed by vampires, as Dracula intended</p>
        <Link to="/shop">take me</Link>
      </div>
    </div>
  );
}

export default Home;
