import { useParams, Link } from 'react-router-dom';
import fictionsData from '../../data/docsData/fictionsData';
import { findBySlug } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const FictionDetail = () => {
  const { slug } = useParams();
  const fiction = findBySlug(fictionsData, slug);

  if (!fiction) {
    return (
      <div className="article-not-found">
        <h1>Article non trouvé</h1>
        <Link to="/documentation/fiction">← Retour aux fictions</Link>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <header className="article-detail-header">
        <Link to="/documentation/fiction" className="back-link">
          ← Retour aux fictions
        </Link>
        <h1>{fiction.notion}</h1>
      </header>

      <article className="article-detail-comic">
        {fiction.illustrations && fiction.illustrations.length > 0 && (
          <div className="article-detail-illustrations">
            {fiction.illustrations.map((illustration, index) => (
              <img src={illustration || '/placeholder.svg'} alt={fiction.alt?.[index] || fiction.notion} key={index} />
            ))}
          </div>
        )}

        <div className="article-detail-content">
          <div className="article-detail-speech-bubble">
            <div className="article-detail-speech-bubble-content">
              <p dangerouslySetInnerHTML={{ __html: fiction.explications }}></p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FictionDetail;
