import { Link } from 'react-router-dom';
import '../../styles/docsStyles/Documentation.css';

const Documentation = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  const articles = [
    {
      icon: '⚔️',
      title: 'Batailles',
      description: 'Découvre les débats les plus épiques entre scientifiques renommés',
      link: '/documentation/batailles',
      linkText: 'Batailles',
    },
    {
      icon: '🔍',
      title: 'Découvertes',
      description: 'Des découvertes fascinantes qui ont modifiées certaines idées reçues',
      link: '/documentation/decouvertes-recentes',
      linkText: 'Découvertes',
    },
    {
      icon: '📚',
      title: 'Définitions',
      description: 'La paléontologie est un langage riche et complexe à découvrir',
      link: '/documentation/definitions',
      linkText: 'Définitions',
    },
    {
      icon: '🎬',
      title: 'Les monstres du passé dans la fiction',
      description: "Pour les amoureux de fictions et d'aventures préhistoriques",
      link: '/documentation/fiction',
      linkText: 'Dans la fiction',
    },
    {
      icon: '🦴',
      title: 'Fossiles célèbres',
      description: "Il existe des fossiles qui sont une mine d'or d'informations. Viens les examiner !",
      link: '/documentation/fossiles-celebres',
      linkText: 'Fossiles célèbres',
    },
    {
      icon: '🥚',
      title: 'Gisements fossilifères',
      description: 'Situe les gisements de fossiles à travers la planète',
      link: '/documentation/gisements-fossiliferes',
      linkText: 'Gisements de fossiles',
    },
    {
      icon: '👨‍🔬',
      title: 'Paléontologues',
      description: "Découvre les plus grands paléontologues de l'histoire et leurs découvertes",
      link: '/documentation/paleontologues',
      linkText: 'Paléontologues',
    },
    {
      icon: '❓',
      title: 'Questions',
      description: 'Trouve les réponses aux questions les plus fréquemment posées sur la paléontologie en général',
      link: '/documentation/questions',
      linkText: 'Questions',
    },
  ];

  return (
    <div className="documentation-page">
      <section className="documentation-header">
        <h1>Documentation</h1>
        <p>Explore l'univers fascinant de la paléontologie</p>
      </section>
      <section className="documentation-grid">
        {articles.map((article, index) => (
          <article key={index} className="documentation-card">
            <div className="card-icon">
              <span>{article.icon}</span>
            </div>
            <div className="card-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link to={article.link} onClick={scrollToTop} className="card-link">
                {article.linkText}
                <span className="link-arrow">→</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Documentation;
