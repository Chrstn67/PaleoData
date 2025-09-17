import { useParams, Link } from 'react-router-dom';
import questionsData from '../../data/docsData/questionsData';
import { findBySlug } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleDetail.css';

const QuestionDetail = () => {
  const { slug } = useParams();
  const question = findBySlug(questionsData, slug);

  if (!question) {
    return (
      <div className="article-not-found">
        <h1>Article non trouvé</h1>
        <Link to="/documentation/questions">← Retour aux questions</Link>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <header className="article-detail-header">
        <Link to="/documentation/questions" className="back-link">
          ← Retour aux questions
        </Link>
        <h1>{question.notion}</h1>
      </header>

      <article className="article-detail-comic">
        {question.illustrations && question.illustrations.length > 0 && (
          <div className="article-detail-illustrations">
            {question.illustrations.map((illustration, index) => (
              <img src={illustration || '/placeholder.svg'} alt={question.alt || question.notion} key={index} />
            ))}
          </div>
        )}

        <div className="article-detail-content">
          <div className="article-detail-speech-bubble">
            <div className="article-detail-speech-bubble-content">
              <p dangerouslySetInnerHTML={{ __html: question.explications }}></p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default QuestionDetail;
