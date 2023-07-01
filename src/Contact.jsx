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
        <div className='flex-column'>
          <p> the premier choice for all vampire needs </p>
          <br/>
          <p>
            we provide services to every corner of Vardoran, <br/>
            regardless if you're in the iron mines of Dunley <br/>
            or deep in the swamps of Gloomrot
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <p>
            our delivery options: <br/>
            BAT DELIVERY (SAME-DAY)<br/>
            FROG DELIVERY (PREMIUM)<br/>
            BEAR DELIVERY (ECONOMY)
          </p>
          <br/>
          <p>
            reach out to us at <span style={{ color:'#598B9Eff' }}>the_lair@dracula.com</span> <br/>
            spend less. hunt more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
