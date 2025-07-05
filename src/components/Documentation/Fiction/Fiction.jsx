import FictionData from './fictionsData';
import './Fiction.css';

const sortedFictionData = [...FictionData].sort((a, b) => a.notion.localeCompare(b.notion));

const Fiction = () => {
  return (
    <section className="fiction-container">
      {sortedFictionData.map((fiction, index) => (
        <div className="fiction-comic" key={index}>
          <header className="fiction-header">
            <h2>{fiction.notion}</h2>
          </header>
          <div className="fiction-illustrations">
            {fiction.illustrations.map((illustration, index) => (
              <img src={illustration} alt={illustration.alt} key={index} />
            ))}
          </div>
          <div className="fiction-content">
            <div className="fiction-speech-bubble">
              <div className="fiction-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: fiction.explications }}></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Fiction;
