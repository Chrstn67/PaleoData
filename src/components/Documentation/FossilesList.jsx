import { Link } from 'react-router-dom';
import fossilesData from '../../data/docsData/fossilesData';
import { slugify } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const sortedFossilesData = [...fossilesData].sort((a, b) => a.notion.localeCompare(b.notion));

const FossilesList = () => {
  return (
    <div className="article-list-page">
      <header className="article-list-header">
        <Link to="/documentation" className="back-link">
          ← Retour
        </Link>
        <h1>Fossiles célèbres</h1>
        <p>Il existe des fossiles qui sont une mine d'or d'informations. Viens les examiner !</p>
      </header>

      <section className="article-list-container">
        {sortedFossilesData.map((fossile, index) => (
          <article className="article-list-item" key={index}>
            <h2>
              <Link to={`/documentation/fossiles-celebres/${slugify(fossile.notion)}`}>{fossile.notion}</Link>
            </h2>
            <div className="article-preview">
              <p
                dangerouslySetInnerHTML={{
                  __html: fossile.explications.substring(0, 200) + '...',
                }}
              ></p>
            </div>
            <Link to={`/documentation/fossiles-celebres/${slugify(fossile.notion)}`} className="read-more-link">
              Lire la suite →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default FossilesList;
