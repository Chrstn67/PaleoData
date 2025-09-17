import { Link } from 'react-router-dom';
import decouvertesRecentesData from '../../data/docsData/decouvertesRecentesData';
import { slugify } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const sortedDecouvertesData = [...decouvertesRecentesData].sort((a, b) => a.notion.localeCompare(b.notion));

const DecouvertesList = () => {
  return (
    <div className="article-list-page">
      <header className="article-list-header">
        <Link to="/documentation" className="back-link">
          ← Retour
        </Link>
        <h1>Découvertes récentes</h1>
        <p>Restez informé des dernières découvertes paléontologiques</p>
      </header>

      <section className="article-list-container">
        {sortedDecouvertesData.map((decouverte, index) => (
          <article className="article-list-item" key={index}>
            <h2>
              <Link to={`/documentation/decouvertes-recentes/${slugify(decouverte.notion)}`}>{decouverte.notion}</Link>
            </h2>
            <div className="article-preview">
              <p
                dangerouslySetInnerHTML={{
                  __html: decouverte.explications.substring(0, 200) + '...',
                }}
              ></p>
            </div>
            <Link to={`/documentation/decouvertes-recentes/${slugify(decouverte.notion)}`} className="read-more-link">
              Lire la suite →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DecouvertesList;
