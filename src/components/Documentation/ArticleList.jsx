import { Link } from 'react-router-dom';
import '../../styles/docsStyles/ArticleList.css';

const ArticleList = ({ data, category, title }) => {
  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Function to extract preview text from HTML content
  const getPreviewText = (htmlContent, maxLength = 200) => {
    if (!htmlContent) return 'Contenu à venir...';

    // Remove HTML tags and get plain text
    const plainText = htmlContent
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (plainText.length <= maxLength) return plainText;

    // Find the last complete word within the limit
    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  // Handle article click with scroll to top
  const handleArticleClick = (e) => {
    scrollToTop();
  };

  return (
    <div className="documentation-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="title-section">
            <h1>{title}</h1>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="breadcrumb">
          <div className="breadcrumb-links">
            <Link to="/documentation">Documentation</Link>
            <span className="separator">›</span>
            <span className="current">{title}</span>
          </div>
        </div>

        <div className="articles-grid fade-in">
          {data.map((article, index) => (
            <Link
              key={index}
              to={`/documentation/${category}/${createSlug(article.notion)}`}
              className="article-card slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={handleArticleClick}
            >
              <h3>{article.notion}</h3>
              <div className="article-preview">{getPreviewText(article.explications)}</div>
              <span className="read-more">Lire la suite →</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="navigation-section">
        <div className="navigation-links">
          <Link to="/documentation" className="navigation-link">
            ← Retour
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
