import { useParams, Link } from 'react-router-dom';
import decouvertesRecentesData from '../../data/docsData/decouvertesRecentesData';
import { findBySlug } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleDetail.css';

const DecouverteDetail = () => {
  const { slug } = useParams();
  const decouverte = findBySlug(decouvertesRecentesData, slug);

  if (!decouverte) {
    return (
      <div className="article-not-found">
        <h1>Article non trouvé</h1>
        <Link to="/documentation/decouvertes-recentes">← Retour aux découvertes récentes</Link>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <header className="article-detail-header">
        <Link to="/documentation/decouvertes-recentes" className="back-link">
          ← Retour aux découvertes récentes
        </Link>
        <h1>{decouverte.notion}</h1>
      </header>

      <article className="article-detail-comic">
        {decouverte.illustrations && decouverte.illustrations.length > 0 && (
          <div className="article-detail-illustrations">
            {decouverte.illustrations.map((illustration, index) => (
              <img src={illustration || '/placeholder.svg'} alt={decouverte.alt || decouverte.notion} key={index} />
            ))}
          </div>
        )}

        <div className="article-detail-content">
          <div className="article-detail-speech-bubble">
            <div className="article-detail-speech-bubble-content">
              <p dangerouslySetInnerHTML={{ __html: decouverte.explications }}></p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DecouverteDetail;
