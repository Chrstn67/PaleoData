import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import decouvertesRecentesData from '../../data/docsData/decouvertesRecentesData';
import { findBySlug, slugify } from '../../utils/slugify';
import { BiShareAlt } from 'react-icons/bi';
import '../../styles/docsStyles/ArticleDetail.css';

const DecouverteDetail = () => {
  const { slug } = useParams();
  const decouverte = findBySlug(decouvertesRecentesData, slug);

  // Scroll to top au chargement
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!decouverte) {
    return (
      <div className="article-detail-page">
        <div className="article-detail-header">
          <div className="hero-content">
            <div className="title-image-section">
              <Link to="/documentation/decouvertes-recentes" className="back-link">
                ← Retour
              </Link>
              <h1>Article non trouvé</h1>
            </div>
          </div>
        </div>
        <div className="article-not-found">
          <h1>Article non trouvé</h1>
          <Link to="/documentation/decouvertes-recentes" className="navigation-link">
            ← Retour
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
  const sortedData = [...decouvertesRecentesData].sort((a, b) => a.notion.localeCompare(b.notion));
  const currentIndex = sortedData.findIndex((item) => slugify(item.notion) === slug);
  const previousArticle = currentIndex > 0 ? sortedData[currentIndex - 1] : null;
  const nextArticle = currentIndex < sortedData.length - 1 ? sortedData[currentIndex + 1] : null;

  return (
    <div className="article-detail-page">
      <div className="article-detail-header">
        <div className="hero-content">
          <div className="title-image-section">
            <Link to="/documentation/decouvertes-recentes" className="back-link">
              ← Retour
            </Link>
            <h1>{decouverte.notion}</h1>
          </div>
          <button
            type="button"
            className="share-btn"
            onClick={() => {
              shareLink(decouverte);
            }}
          >
            <BiShareAlt size={20} />
          </button>
        </div>
      </div>

      <div className="main-container">
        <div className="article-detail-comic">
          {decouverte.illustrations && decouverte.illustrations.length > 0 && (
            <div className="article-detail-illustrations">
              {decouverte.illustrations.map((illustration, index) => (
                <div key={index} className="illustration-item">
                  <img src={illustration || '/placeholder.svg'} alt={decouverte.alt?.[index] || decouverte.notion} />
                  {decouverte.alt?.[index] && <p className="illustration-caption">{decouverte.alt[index]}</p>}
                </div>
              ))}
            </div>
          )}

          <div className="article-detail-content">
            <div className="article-detail-speech-bubble">
              <div className="article-detail-speech-bubble-content">
                <div dangerouslySetInnerHTML={{ __html: decouverte.explications }} />
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
              to={`/documentation/decouvertes-recentes/${slugify(previousArticle.notion)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              ← {previousArticle.notion}
            </Link>
          )}

          {nextArticle && (
            <Link
              to={`/documentation/decouvertes-recentes/${slugify(nextArticle.notion)}`}
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

export default DecouverteDetail;
