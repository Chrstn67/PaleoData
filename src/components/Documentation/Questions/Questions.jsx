import React from 'react';
import questionsData from './questionsData';
import './Questions.scss';

const sortedQuestionsData = [...questionsData].sort((a, b) => a.notion.localeCompare(b.notion));

const Questions = () => {
  return (
    <section className="question-container">
      {sortedQuestionsData.map((question, index) => (
        <div className="question-comic" key={index}>
          <header className="question-header">
            <h2>{question.notion}</h2>
          </header>
          <div className="question-illustrations">
            {question.illustrations?.map((illustration, index) => (
              <img src={illustration} alt={question.alt} key={index} />
            ))}
          </div>
          <div className="question-content">
            <div className="bataille-speech-bubble">
              <div className="question-speech-bubble-content">
                <p dangerouslySetInnerHTML={{ __html: question.explications }}></p>
              </div>
            </div>{' '}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Questions;
