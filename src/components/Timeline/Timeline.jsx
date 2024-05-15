import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaInfo } from 'react-icons/fa';

// import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import ModalTimeline from './ModalTimeline/ModalTimeline';

import './Timeline.scss';

const Timeline = ({ timelineData }) => {
  const [openEra, setOpenEra] = useState(null);
  const [openPeriod, setOpenPeriod] = useState(null);
  const [openEpoch, setOpenEpoch] = useState(null);
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
    <div>
      <div className="timeline-container">
        <VerticalTimeline className="timeline">
          {timelineData.map((era) => (
            <VerticalTimelineElement key={era.era} className="era">
              <div
                className={`era-label ${openEra === era.era ? 'open' : ''}`}
                onClick={() => setOpenEra(openEra === era.era ? null : era.era)}
              >
                {era.era}

                <div className="era-start">{formatValue(era.eraStart)}</div>
                <div className="era-end">{formatValue(era.eraEnd)}</div>

                <div className="info">
                  <button type="button" onClick={() => handleInfoClick(era.eraInfo)}>
                    <FaInfo size={20} />
                  </button>
                </div>
              </div>

              {openEra === era.era &&
                era.periods.map((period) => (
                  <VerticalTimelineElement key={period.name} className="period">
                    <div
                      className={`period-label ${openPeriod === period.name ? 'open' : ''}`}
                      onClick={() => setOpenPeriod(openPeriod === period.name ? null : period.name)}
                    >
                      {period.name}
                      <div className="period-start">{formatValue(period.periodStart)}</div>
                      <div className="period-end">{formatValue(period.periodEnd)}</div>
                      <div className="info">
                        <button type="button" onClick={() => handleInfoClick(period.periodInfo)}>
                          <FaInfo size={20} />
                        </button>
                      </div>
                    </div>

                    {openPeriod === period.name &&
                      period.epochs.map((epoch) => (
                        <VerticalTimelineElement key={epoch.name} className="epoch">
                          <div
                            className={`epoch-label ${openEpoch === epoch.name ? 'open' : ''}`}
                            onClick={() => setOpenEpoch(openEpoch === epoch.name ? null : epoch.name)}
                          >
                            {epoch.name}
                            <div className="epoch-start">{formatValue(epoch.epochStart)}</div>
                            <div className="epoch-end">{formatValue(epoch.epochEnd)}</div>
                            <div className="info">
                              <button type="button" onClick={() => handleInfoClick(epoch.epochInfo)}>
                                <FaInfo size={20} />
                              </button>
                            </div>
                          </div>

                          {openEpoch === epoch.name &&
                            epoch.stage &&
                            epoch.stage.map((stage) => (
                              <VerticalTimelineElement key={stage.name} className="stage">
                                <div className="stage-label">{stage.name}</div>
                                <div className="stage-start">{formatValue(stage.stageStart)}</div>
                                <div className="stage-end">{formatValue(stage.stageEnd)}</div>
                                <div className="info">
                                  <button type="button" onClick={() => handleInfoClick(stage.stageInfo)}>
                                    <FaInfo size={20} />
                                  </button>
                                </div>
                              </VerticalTimelineElement>
                            ))}
                        </VerticalTimelineElement>
                      ))}
                  </VerticalTimelineElement>
                ))}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
      <ModalTimeline isOpen={isModalOpen} closeModal={closeModal} content={modalContent} />
    </div>
  );
};

Timeline.propTypes = {
  timelineData: PropTypes.arrayOf(
    PropTypes.shape({
      era: PropTypes.string.isRequired,
      start: PropTypes.number,
      end: PropTypes.number,
      periods: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          start: PropTypes.number,
          end: PropTypes.number,
          epochs: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              start: PropTypes.number,
              end: PropTypes.number,
              stage: PropTypes.arrayOf(
                PropTypes.shape({
                  name: PropTypes.string.isRequired,
                  start: PropTypes.number,
                  end: PropTypes.number,
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
