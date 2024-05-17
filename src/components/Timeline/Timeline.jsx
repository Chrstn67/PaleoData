import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaInfo } from 'react-icons/fa';
import ModalTimeline from './ModalTimeline/ModalTimeline';
import './Timeline.scss';

const Timeline = ({ timelineData }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="timeline-container">
      <div className="timeline">
        {timelineData.map((era) => (
          <div key={era.era} className="timeline-item era">
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
              <div key={period.name} className="timeline-item period">
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
                  <div key={epoch.name} className="timeline-item epoch">
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
                        <div key={stage.name} className="timeline-item stage">
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
