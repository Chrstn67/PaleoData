import { Link } from 'react-router-dom';
import fictionsData from '../../data/docsData/fictionsData';
import { slugify } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const sortedFictionsData = [...fictionsData].sort((a, b) => a.notion.localeCompare(b.notion));

const FictionsList = () => {
  return (
    <div className="article-list-page">
      <header className="article-list-header">
        <Link to="/documentation" className="back-link">
          ← Retour
        </Link>
        <h1>Les monstres du passé dans la fiction</h1>
        <p>Pour les amoureux de fictions et d'aventures préhistoriques</p>
      </header>

      <section className="article-list-container">
        {sortedFictionsData.map((fiction, index) => (
          <article className="article-list-item" key={index}>
            <h2>
              <Link to={`/documentation/fiction/${slugify(fiction.notion)}`}>{fiction.notion}</Link>
            </h2>
            <div className="article-preview">
              <p
                dangerouslySetInnerHTML={{
                  __html: fiction.explications.substring(0, 200) + '...',
                }}
              ></p>
            </div>
            <Link to={`/documentation/fiction/${slugify(fiction.notion)}`} className="read-more-link">
              Lire la suite →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default FictionsList;
