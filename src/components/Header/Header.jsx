import NavBar from './NavBar/NavBar';
import './Header.css';

function Header() {
  return (
    <header className="Header">
      <div>
        <img src="PaleoData.png" alt="Logo du site PaleoData" />
        <h1>PaleoData</h1>
        <p>Safari préhistorique à la rencontre d'animaux ayant peuplé notre Terre !</p>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
