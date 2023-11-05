import NavBar from './NavBar/NavBar';
import './Header.scss';

function Header() {
  return (
    <header className="Header">
      <div>
        <img src="Logo-site.jpg" alt="Logo du site PaleoData" />
        <h1>PaleoData</h1>
        <p>Un safari préhistorique à la rencontre d'animaux ayant peuplé notre Terre !</p>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
