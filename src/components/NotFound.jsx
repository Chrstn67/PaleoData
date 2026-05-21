import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <main className="NotFound">
      <span className="NotFound__bg-text" aria-hidden="true">
        404
      </span>

      <div className="NotFound__img-wrapper">
        <img src="./404.png" alt="Page inexistante représentée par un dinosaure dans le désert" />
      </div>

      <div className="NotFound__content">
        <h1 className="NotFound__title">Page introuvable</h1>
        <p className="NotFound__subtitle">Retourne vite d'où tu viens !</p>
        <a href="/" className="NotFound__link">
          ← Retour à l'accueil
        </a>
      </div>
    </main>
  );
};

export default NotFound;
