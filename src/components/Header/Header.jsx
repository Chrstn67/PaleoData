import NavBar from '../Header/NavBar/NavBar';
import './Header.scss';

function Header() {
  return (
    <>
      <header className="Header">
        <div>
          <img src="PaleoData.png" alt="Logo du site PaleoData" />
          <h1>PaleoData</h1>
          <p>Safari préhistorique à la rencontre d'animaux ayant peuplé notre Terre !</p>
        </div>
      </header>

      <NavBar />
    </>
  );
}

export default Header;
