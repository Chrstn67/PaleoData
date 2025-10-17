import NavBar from './NavBar';
import '../styles/Header.css';

function Header() {
  return (
    <header className="Header" role="banner">
      <div itemScope itemType="https://schema.org/WebSite">
        <img
          src="PaleoData.png"
          alt="Logo du site PaleoData - Plateforme de découverte des animaux préhistoriques"
          itemProp="image"
        />
        <h1 itemProp="name">PaleoData</h1>
        <p itemProp="description">Safari préhistorique à la rencontre d'animaux ayant peuplé notre Terre !</p>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
