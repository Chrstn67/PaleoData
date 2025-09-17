import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/docsStyles/ArticleDetail.css';

const ArticleDetail = ({ data, category, categoryTitle }) => {
  const { slug } = useParams();

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
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Find the article by slug
  const article = data.find((item) => createSlug(item.notion) === slug);

  if (!article) {
    return (
      <div className="documentation-container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="title-section">
              <h1>Article non trouvé</h1>
            </div>
          </div>
        </div>
        <div className="main-container">
          <div className="navigation-section">
            <div className="navigation-links">
              <Link to="/documentation" className="navigation-link">
                ← Retour
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Function to share article
  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${article.notion} - Documentation Paléontologique`,
          text: `Découvrez cet article sur ${article.notion}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Erreur lors du partage :', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papiers !');
      } catch (error) {
        console.error('Erreur lors de la copie :', error);
      }
    }
  };

  // Get navigation articles (previous/next)
  const currentIndex = data.findIndex((item) => createSlug(item.notion) === slug);
  const previousArticle = currentIndex > 0 ? data[currentIndex - 1] : null;
  const nextArticle = currentIndex < data.length - 1 ? data[currentIndex + 1] : null;

  return (
    <div className="documentation-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="title-section">
            <h1>{article.notion}</h1>
          </div>
          <button type="button" className="share-btn" onClick={shareArticle} title="Partager cet article">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="main-container">
        <div className="breadcrumb">
          <div className="breadcrumb-links">
            <Link to="/documentation">Documentation</Link>
            <span className="separator">›</span>
            <Link to={`/documentation/${category}`}>{categoryTitle}</Link>
            <span className="separator">›</span>
            <span className="current">{article.notion}</span>
          </div>
        </div>

        <div className="article-detail fade-in">
          <div className="content-section">
            <div className="content-card">
              <h3>Contenu</h3>
              <div className="content-text" dangerouslySetInnerHTML={{ __html: article.explications }} />
            </div>

            {article.illustrations && article.illustrations.length > 0 && (
              <div className="content-card">
                <h3>Illustrations</h3>
                <div className="illustrations-grid">
                  {article.illustrations.map((image, index) => (
                    <div key={index} className="illustration-item">
                      <img
                        src={image || '/placeholder.svg'}
                        alt={article.alt?.[index] || `Illustration ${index + 1}`}
                        className="illustration-image"
                      />
                      {article.alt?.[index] && <p className="illustration-caption">{article.alt[index]}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navigation-section">
        <div className="navigation-links">
          <Link to={`/documentation/${category}`} className="navigation-link" onClick={scrollToTop}>
            ← Retour à {categoryTitle}
          </Link>

          <div className="prev-next-nav">
            {previousArticle && (
              <Link
                to={`/documentation/${category}/${createSlug(previousArticle.notion)}`}
                className="navigation-link"
                onClick={scrollToTop}
              >
                ← {previousArticle.notion}
              </Link>
            )}

            {nextArticle && (
              <Link
                to={`/documentation/${category}/${createSlug(nextArticle.notion)}`}
                className="navigation-link"
                onClick={scrollToTop}
              >
                {nextArticle.notion} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
