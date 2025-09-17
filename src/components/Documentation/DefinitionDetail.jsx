import { useParams, Link } from 'react-router-dom';
import definitionsData from '../../data/docsData/definitionsData';
import { findBySlug } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleDetail.css';

const DefinitionDetail = () => {
  const { slug } = useParams();
  const definition = findBySlug(definitionsData, slug);

  if (!definition) {
    return (
      <div className="article-not-found">
        <h1>Article non trouvé</h1>
        <Link to="/documentation/definitions">← Retour aux définitions</Link>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <header className="article-detail-header">
        <Link to="/documentation/definitions" className="back-link">
          ← Retour aux définitions
        </Link>
        <h1>{definition.notion}</h1>
      </header>

      <article className="article-detail-comic">
        {definition.illustrations && definition.illustrations.length > 0 && (
          <div className="article-detail-illustrations">
            {definition.illustrations.map((illustration, index) => (
              <img src={illustration || '/placeholder.svg'} alt={definition.alt || definition.notion} key={index} />
            ))}
          </div>
        )}

        <div className="article-detail-content">
          <div className="article-detail-speech-bubble">
            <div className="article-detail-speech-bubble-content">
              <p dangerouslySetInnerHTML={{ __html: definition.explications }}></p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DefinitionDetail;
