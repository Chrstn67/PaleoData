import { Link } from 'react-router-dom';
import definitionsData from '../../data/docsData/definitionsData';
import { slugify } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const sortedDefinitionsData = [...definitionsData].sort((a, b) => a.notion.localeCompare(b.notion));

const DefinitionsList = () => {
  return (
    <div className="article-list-page">
      <header className="article-list-header">
        <Link to="/documentation" className="back-link">
          ← Retour
        </Link>
        <h1>Définitions</h1>
        <p>La paléontologie est un langage riche et complexe à découvrir</p>
      </header>

      <section className="article-list-container">
        {sortedDefinitionsData.map((definition, index) => (
          <article className="article-list-item" key={index}>
            <h2>
              <Link to={`/documentation/definitions/${slugify(definition.notion)}`}>{definition.notion}</Link>
            </h2>
            <div className="article-preview">
              <p
                dangerouslySetInnerHTML={{
                  __html: definition.explications.substring(0, 200) + '...',
                }}
              ></p>
            </div>
            <Link to={`/documentation/definitions/${slugify(definition.notion)}`} className="read-more-link">
              Lire la suite →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DefinitionsList;
