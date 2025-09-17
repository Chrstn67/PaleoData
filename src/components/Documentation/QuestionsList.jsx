import { Link } from 'react-router-dom';
import questionsData from '../../data/docsData/questionsData';
import { slugify } from '../../utils/slugify';
import '../../styles/docsStyles/ArticleList.css';

const sortedQuestionsData = [...questionsData].sort((a, b) => a.notion.localeCompare(b.notion));

const QuestionsList = () => {
  return (
    <div className="article-list-page">
      <header className="article-list-header">
        <Link to="/documentation" className="back-link">
          ← Retour
        </Link>
        <h1>Questions</h1>
        <p>Trouvez les réponses aux questions les plus fréquemment posées sur la paléontologie</p>
      </header>

      <section className="article-list-container">
        {sortedQuestionsData.map((question, index) => (
          <article className="article-list-item" key={index}>
            <h2>
              <Link to={`/documentation/questions/${slugify(question.notion)}`}>{question.notion}</Link>
            </h2>
            <div className="article-preview">
              <p
                dangerouslySetInnerHTML={{
                  __html: question.explications.substring(0, 200) + '...',
                }}
              ></p>
            </div>
            <Link to={`/documentation/questions/${slugify(question.notion)}`} className="read-more-link">
              Lire la suite →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default QuestionsList;
