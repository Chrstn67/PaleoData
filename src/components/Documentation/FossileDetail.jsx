import { useParams, Link } from 'react-router-dom';
import fossilesData from '../../data/docsData/fossilesData';
import { findBySlug } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleDetail.css';

const FossileDetail = () => {
  const { slug } = useParams();
  const fossile = findBySlug(fossilesData, slug);

  if (!fossile) {
    return (
      <div className="article-not-found">
        <h1>Article non trouvé</h1>
        <Link to="/documentation/fossiles-celebres">← Retour aux fossiles célèbres</Link>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <header className="article-detail-header">
        <Link to="/documentation/fossiles-celebres" className="back-link">
          ← Retour aux fossiles célèbres
        </Link>
        <h1>{fossile.notion}</h1>
      </header>

      <article className="article-detail-comic">
        {fossile.illustrations && fossile.illustrations.length > 0 && (
          <div className="article-detail-illustrations">
            {fossile.illustrations.map((illustration, index) => (
              <img src={illustration || '/placeholder.svg'} alt={fossile.alt || fossile.notion} key={index} />
            ))}
          </div>
        )}

        <div className="article-detail-content">
          <div className="article-detail-speech-bubble">
            <div className="article-detail-speech-bubble-content">
              <p dangerouslySetInnerHTML={{ __html: fossile.explications }}></p>
              {fossile.video && (
                <div className="video-container">
                  <a href={fossile.video} target="_blank" rel="noopener noreferrer">
                    Voir la vidéo →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FossileDetail;
