import './Home.css';
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div className="App">
      <header className="flex-row header " style={{ gap:'11% '}}>
        <Link to="/">THE LAIR</Link>
        <Link to="/shop">products</Link>
      </header>
      <div className='contact'>
        <p>
           the premier choice for all vampire needs <br/>
           we provide services to every corner of Vardoran, regardless if you're in the iron mines of Dunley or deep in the swamps of Gloomrot
        </p>
        <br/>
        <p>
          our delivery options: <br/>
          BAT DELIVERY (SAME-DAY)<br/>
          FROG DELIVERY (PREMIUM)<br/>
          BEAR DELIVERY (ECONOMY)
        </p>
        <br/>
        <p>
          reach out to us at the_lair@dracula.com <br/>
          spend less. hunt more.
        </p>
      </div>
    </div>
  );
}

export default Checkout;
