import { Link } from 'react-router-dom';
import bataillesData from '../../data/docsData/bataillesData';
import { slugify } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const sortedBataillesData = [...bataillesData].sort((a, b) => a.notion.localeCompare(b.notion));

const BataillesList = () => {
  return (
    <div className="article-list-page">
      <header className="article-list-header">
        <Link to="/documentation" className="back-link">
          ← Retour
        </Link>
        <h1>Batailles</h1>
        <p>Découvre les débats les plus épiques entre scientifiques renommés</p>
      </header>

      <section className="article-list-container">
        {sortedBataillesData.map((bataille, index) => (
          <article className="article-list-item" key={index}>
            <h2>
              <Link to={`/documentation/batailles/${slugify(bataille.notion)}`}>{bataille.notion}</Link>
            </h2>
            <div className="article-preview">
              <p
                dangerouslySetInnerHTML={{
                  __html: bataille.explications.substring(0, 200) + '...',
                }}
              ></p>
            </div>
            <Link to={`/documentation/batailles/${slugify(bataille.notion)}`} className="read-more-link">
              Lire la suite →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default BataillesList;
