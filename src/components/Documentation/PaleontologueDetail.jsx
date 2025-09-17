import { useParams, Link } from 'react-router-dom';
import paleontologuesData from '../../data/docsData/paleontologuesData';
import { findBySlug } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleDetail.css';

const PaleontologueDetail = () => {
  const { slug } = useParams();
  const paleontologue = findBySlug(paleontologuesData, slug);

  if (!paleontologue) {
    return (
      <div className="article-not-found">
        <h1>Article non trouvé</h1>
        <Link to="/documentation/paleontologues">← Retour aux paléontologues</Link>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <header className="article-detail-header">
        <Link to="/documentation/paleontologues" className="back-link">
          ← Retour aux paléontologues
        </Link>
        <h1>{paleontologue.notion}</h1>
      </header>

      <article className="article-detail-comic">
        {paleontologue.illustrations && paleontologue.illustrations.length > 0 && (
          <div className="article-detail-illustrations">
            {paleontologue.illustrations.map((illustration, index) => (
              <img
                src={illustration || '/placeholder.svg'}
                alt={paleontologue.alt || paleontologue.notion}
                key={index}
              />
            ))}
          </div>
        )}

        <div className="article-detail-content">
          <div className="article-detail-speech-bubble">
            <div className="article-detail-speech-bubble-content">
              <p dangerouslySetInnerHTML={{ __html: paleontologue.explications }}></p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PaleontologueDetail;
