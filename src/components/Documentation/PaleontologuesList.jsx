import { Link } from 'react-router-dom';
import paleontologuesData from '../../data/docsData/paleontologuesData';
import { slugify } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const sortedPaleontologuesData = [...paleontologuesData].sort((a, b) => a.notion.localeCompare(b.notion));

const PaleontologuesList = () => {
  return (
    <div className="article-list-page">
      <header className="article-list-header">
        <Link to="/documentation" className="back-link">
          ← Retour
        </Link>
        <h1>Paléontologues</h1>
        <p>Découvre les plus grands paléontologues de l'histoire et leurs découvertes</p>
      </header>

      <section className="article-list-container">
        {sortedPaleontologuesData.map((paleontologue, index) => (
          <article className="article-list-item" key={index}>
            <h2>
              <Link to={`/documentation/paleontologues/${slugify(paleontologue.notion)}`}>{paleontologue.notion}</Link>
            </h2>
            <div className="article-preview">
              <p
                dangerouslySetInnerHTML={{
                  __html: paleontologue.explications.substring(0, 200) + '...',
                }}
              ></p>
            </div>
            <Link to={`/documentation/paleontologues/${slugify(paleontologue.notion)}`} className="read-more-link">
              Lire la suite →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default PaleontologuesList;
