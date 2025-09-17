import { useParams, Link } from 'react-router-dom';
import bataillesData from '../../data/docsData/bataillesData';
import { findBySlug } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleDetail.css';

const BatailleDetail = () => {
  const { slug } = useParams();
  const bataille = findBySlug(bataillesData, slug);

  if (!bataille) {
    return (
      <div className="article-not-found">
        <h1>Article non trouvé</h1>
        <Link to="/documentation/batailles">← Retour aux batailles</Link>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <header className="article-detail-header">
        <Link to="/documentation/batailles" className="back-link">
          ← Retour aux batailles
        </Link>
        <h1>{bataille.notion}</h1>
      </header>

      <article className="article-detail-comic">
        {bataille.illustrations && bataille.illustrations.length > 0 && (
          <div className="article-detail-illustrations">
            <img src={bataille.illustrations[0] || '/placeholder.svg'} alt={bataille.alt?.[0] || bataille.notion} />
            <span className="vs-text">VS</span>
            <img src={bataille.illustrations[1] || '/placeholder.svg'} alt={bataille.alt?.[1] || bataille.notion} />
          </div>
        )}

        <div className="article-detail-content">
          <div className="article-detail-speech-bubble">
            <div className="article-detail-speech-bubble-content">
              <p dangerouslySetInnerHTML={{ __html: bataille.explications }}></p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BatailleDetail;
