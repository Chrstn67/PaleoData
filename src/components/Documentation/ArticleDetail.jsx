import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BiShareAlt, BiX } from 'react-icons/bi';
import '../../styles/docsStyles/ArticleDetail.css';

const ArticleDetail = ({ data, category, categoryTitle }) => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (img) => {
    setSelectedImage(img);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, [slug]);

  // Function to create URL-friendly slug from title
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Find the article by slug
  const article = data.find((item) => createSlug(item.notion) === slug);

  // Get navigation articles (previous/next) - Identique à AnimalCard
  const sortedData = [...data].sort((a, b) => a.notion.localeCompare(b.notion));
  const currentIndex = sortedData.findIndex((item) => createSlug(item.notion) === slug);
  const previousArticle = currentIndex > 0 ? sortedData[currentIndex - 1] : null;
  const nextArticle = currentIndex < sortedData.length - 1 ? sortedData[currentIndex + 1] : null;

  if (!article) {
    return (
      <div className="article-detail-page">
        <div className="article-detail-header">
          <div className="hero-content">
            <div className="title-image-section">
              <Link to={`/documentation/${category}`} className="back-link">
                ← Retour
              </Link>
              <h1>Article non trouvé</h1>
            </div>
          </div>
        </div>
        <div className="article-not-found">
          <h1>Article non trouvé</h1>
          <Link to="/documentation" className="navigation-link">
            ← Retour à la documentation
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

  return (
    <div className="article-detail-page">
      <div className="article-detail-header">
        <div className="hero-content">
          <div className="title-image-section">
            <Link to={`/documentation/${category}`} className="back-link">
              ← Retour
            </Link>
            <h1>{article.notion}</h1>
          </div>
          <button
            type="button"
            className="share-btn"
            onClick={() => {
              shareLink(article);
            }}
          >
            <BiShareAlt size={20} />
          </button>
        </div>
      </div>

      <div className="main-container">
        <div className="article-detail-comic">
          <div className="article-detail-content">
            <div className="article-detail-speech-bubble">
              <div className="article-detail-speech-bubble-content">
                <div dangerouslySetInnerHTML={{ __html: article.explications }} />
              </div>
            </div>

            {article.illustrations && article.illustrations.length > 0 && (
              <div className="article-detail-illustrations">
                {article.illustrations.map((image, index) => (
                  <div key={index} className="illustration-item">
                    <div
                      className="image-container"
                      onClick={() => openImageModal(image)}
                      style={{ cursor: 'pointer' }}
                      title="Cliquer pour agrandir"
                    >
                      <img
                        src={image || '/placeholder.svg'}
                        alt={article.alt?.[index] || `Illustration ${index + 1}`}
                      />
                    </div>
                    {article.alt?.[index] && <p className="illustration-caption">{article.alt[index]}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation identique à AnimalCard */}
      <div className="navigation-section">
        <div className="navigation-links">
          {previousArticle && (
            <Link
              to={`/documentation/${category}/${createSlug(previousArticle.notion)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              ← {previousArticle.notion}
            </Link>
          )}

          {nextArticle && (
            <Link
              to={`/documentation/${category}/${createSlug(nextArticle.notion)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              {nextArticle.notion} →
            </Link>
          )}
        </div>
      </div>

      {/* Modal image */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={handleModalClick}>
          <div className="image-modal-content">
            <button className="image-modal-close" onClick={closeImageModal}>
              <BiX size={24} />
            </button>
            <img src={selectedImage} alt="Illustration agrandie" className="image-modal-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
