import './Home.css';
import bg from './images/homepage.jpg';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="flex-row header " style={{ gap:'11% '}}>
        <Link to="/">THE LAIR</Link>
        <Link to="/shop">shop</Link>
        <Link to="/contact">contact</Link>
      </header>
      <img src={ bg } alt='homepage background'></img>
    </div>
  );
}

export default Home;
