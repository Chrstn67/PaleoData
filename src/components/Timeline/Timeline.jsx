import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaInfo } from 'react-icons/fa';
import ModalTimeline from './ModalTimeline/ModalTimeline';
import './Timeline.css';

const Timeline = ({ timelineData }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const timelineRef = useRef(null);

  const handleInfoClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const formatValue = (value) => {
    const isMillionYears = value < 0;
    const absValue = Math.abs(value);

    const formattedValue = isMillionYears ? (
      <span>
        {`-${absValue.toLocaleString()} Ma`}
        <br />
        {`(-${(absValue * 1000000).toLocaleString()} ans)`}
      </span>
    ) : (
      <span>{`${absValue.toLocaleString()} ${absValue < 0 ? 'Ma' : ''}`}</span>
    );

    return formattedValue;
  };

  const highlightMatches = (name) => {
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  useEffect(() => {
    if (searchQuery) {
      const highlightedElement = document.querySelector('.highlighted');
      if (highlightedElement) {
        const offset = 100;
        const elementPosition = highlightedElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [searchQuery]);

  return (
    <div className="timeline-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="timeline" ref={timelineRef}>
        {timelineData.map((era) => (
          <div
            key={era.era}
            className={`timeline-item era ${
              era.era === activeElement?.era ? 'active' : ''
            } ${highlightMatches(era.era) ? 'highlighted' : ''}`}
          >
            <div className="timeline-label">
              {era.era}
              <div className="timeline-range">
                <span className="timeline-start">{formatValue(era.eraStart)}</span>
                <span className="timeline-end">{formatValue(era.eraEnd)}</span>
              </div>
              <button className="info-button" onClick={() => handleInfoClick(era.eraInfo)}>
                <FaInfo size={20} />
              </button>
            </div>
            {era.periods.map((period) => (
              <div
                key={period.name}
                className={`timeline-item period ${
                  period.name === activeElement?.name && period.parentEra === activeElement?.parentEra ? 'active' : ''
                } ${highlightMatches(period.name) ? 'highlighted' : ''}`}
              >
                <div className="timeline-label">
                  {period.name}
                  <div className="timeline-range">
                    <span className="timeline-start">{formatValue(period.periodStart)}</span>
                    <span className="timeline-end">{formatValue(period.periodEnd)}</span>
                  </div>
                  <button className="info-button" onClick={() => handleInfoClick(period.periodInfo)}>
                    <FaInfo size={20} />
                  </button>
                </div>
                {period.epochs.map((epoch) => (
                  <div
                    key={epoch.name}
                    className={`timeline-item epoch ${
                      epoch.name === activeElement?.name &&
                      epoch.parentPeriod === activeElement?.parentPeriod &&
                      epoch.parentEra === activeElement?.parentEra
                        ? 'active'
                        : ''
                    } ${highlightMatches(epoch.name) ? 'highlighted' : ''}`}
                  >
                    <div className="timeline-label">
                      {epoch.name}
                      <div className="timeline-range">
                        <span className="timeline-start">{formatValue(epoch.epochStart)}</span>
                        <span className="timeline-end">{formatValue(epoch.epochEnd)}</span>
                      </div>
                      <button className="info-button" onClick={() => handleInfoClick(epoch.epochInfo)}>
                        <FaInfo size={20} />
                      </button>
                    </div>
                    {epoch.stage &&
                      epoch.stage.map((stage) => (
                        <div
                          key={stage.name}
                          className={`timeline-item stage ${
                            stage.name === activeElement?.name &&
                            stage.parentEpoch === activeElement?.parentEpoch &&
                            stage.parentPeriod === activeElement?.parentPeriod &&
                            stage.parentEra === activeElement?.parentEra
                              ? 'active'
                              : ''
                          } ${highlightMatches(stage.name) ? 'highlighted' : ''}`}
                        >
                          <div className="timeline-label">
                            {stage.name}
                            <div className="timeline-range">
                              <span className="timeline-start">{formatValue(stage.stageStart)}</span>
                              <span className="timeline-end">{formatValue(stage.stageEnd)}</span>
                            </div>
                            <button className="info-button" onClick={() => handleInfoClick(stage.stageInfo)}>
                              <FaInfo size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <ModalTimeline isOpen={isModalOpen} closeModal={closeModal} content={modalContent} />
    </div>
  );
};

Timeline.propTypes = {
  timelineData: PropTypes.arrayOf(
    PropTypes.shape({
      era: PropTypes.string.isRequired,
      eraStart: PropTypes.number,
      eraEnd: PropTypes.number,
      periods: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          periodStart: PropTypes.number,
          periodEnd: PropTypes.number,
          epochs: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              epochStart: PropTypes.number,
              epochEnd: PropTypes.number,
              stage: PropTypes.arrayOf(
                PropTypes.shape({
                  name: PropTypes.string.isRequired,
                  stageStart: PropTypes.number,
                  stageEnd: PropTypes.number,
                  stageInfo: PropTypes.string,
                }),
              ),
            }),
          ),
        }),
      ),
    }),
  ).isRequired,
};

export default Timeline;
