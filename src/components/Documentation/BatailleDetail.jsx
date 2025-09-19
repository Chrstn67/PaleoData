import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import bataillesData from '../../data/docsData/bataillesData';
import { findBySlug, slugify } from '../../utils/slugify';
import { BiShareAlt } from 'react-icons/bi';
import '../../styles/docsStyles/ArticleDetail.css';

const BatailleDetail = () => {
  const { slug } = useParams();
  const bataille = findBySlug(bataillesData, slug);

  // Scroll to top au chargement
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!bataille) {
    return (
      <div className="article-detail-page">
        <div className="article-detail-header">
          <div className="hero-content">
            <div className="title-image-section">
              <Link to="/documentation/batailles" className="back-link">
                ← Retour aux batailles
              </Link>
              <h1>Article non trouvé</h1>
            </div>
          </div>
        </div>
        <div className="article-not-found">
          <h1>Article non trouvé</h1>
          <Link to="/documentation/batailles" className="navigation-link">
            ← Retour aux batailles
          </Link>
        </div>
      </div>
    );
  }

  // Function to share article - IDENTIQUE à AnimalCard
  const shareLink = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Découvre des informations sur ${article.notion}.`,
          text: `Découvre des informations sur ${article.notion}.`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Erreur lors du partage :', error);
      }
    }
  };

  // Get navigation articles (previous/next) - Identique à AnimalCard
  const sortedData = [...bataillesData].sort((a, b) => a.notion.localeCompare(b.notion));
  const currentIndex = sortedData.findIndex((item) => slugify(item.notion) === slug);
  const previousArticle = currentIndex > 0 ? sortedData[currentIndex - 1] : null;
  const nextArticle = currentIndex < sortedData.length - 1 ? sortedData[currentIndex + 1] : null;

  return (
    <div className="article-detail-page">
      <div className="article-detail-header">
        <div className="hero-content">
          <div className="title-image-section">
            <Link to="/documentation/batailles" className="back-link">
              ← Retour aux batailles
            </Link>
            <h1>{bataille.notion}</h1>
          </div>
          <button
            type="button"
            className="share-btn"
            onClick={() => {
              shareLink(bataille);
            }}
          >
            <BiShareAlt size={20} />
          </button>
        </div>
      </div>

      <div className="main-container">
        <div className="article-detail-comic">
          {bataille.illustrations && bataille.illustrations.length > 0 && (
            <div className="article-detail-illustrations">
              {bataille.illustrations.map((illustration, index) => (
                <div key={index} className="illustration-item">
                  <img src={illustration || '/placeholder.svg'} alt={bataille.alt?.[index] || bataille.notion} />
                  {bataille.alt?.[index] && <p className="illustration-caption">{bataille.alt[index]}</p>}
                </div>
              ))}
            </div>
          )}

          <div className="article-detail-content">
            <div className="article-detail-speech-bubble">
              <div className="article-detail-speech-bubble-content">
                <div dangerouslySetInnerHTML={{ __html: bataille.explications }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation identique à AnimalCard */}
      <div className="navigation-section">
        <div className="navigation-links">
          {previousArticle && (
            <Link
              to={`/documentation/batailles/${slugify(previousArticle.notion)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              ← {previousArticle.notion}
            </Link>
          )}

          {nextArticle && (
            <Link
              to={`/documentation/batailles/${slugify(nextArticle.notion)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              {nextArticle.notion} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatailleDetail;
