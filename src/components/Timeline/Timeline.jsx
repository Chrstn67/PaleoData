'use client';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaInfo, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ModalTimeline from './ModalTimeline/ModalTimeline';
import './Timeline.css';

const Timeline = ({ timelineData }) => {
  const [currentLevel, setCurrentLevel] = useState('era');
  const [currentParent, setCurrentParent] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timelineRef = useRef(null);

  // Get current data based on level and parent
  const getCurrentData = () => {
    if (currentLevel === 'era') {
      return timelineData.map((era) => ({
        ...era,
        type: 'era',
        name: era.era,
        start: era.eraStart,
        end: era.eraEnd,
        info: era.eraInfo,
        children: era.periods,
      }));
    }

    if (currentLevel === 'period' && currentParent) {
      const era = timelineData.find((e) => e.era === currentParent.name);
      return era
        ? era.periods.map((period) => ({
            ...period,
            type: 'period',
            start: period.periodStart,
            end: period.periodEnd,
            info: period.periodInfo,
            children: period.epochs,
          }))
        : [];
    }

    if (currentLevel === 'epoch' && currentParent) {
      return currentParent.children.map((epoch) => ({
        ...epoch,
        type: 'epoch',
        start: epoch.epochStart,
        end: epoch.epochEnd,
        info: epoch.epochInfo,
        children: epoch.stage || [],
      }));
    }

    if (currentLevel === 'stage' && currentParent) {
      return currentParent.children.map((stage) => ({
        ...stage,
        type: 'stage',
        start: stage.stageStart,
        end: stage.stageEnd,
        info: stage.stageInfo,
        children: [],
      }));
    }

    return [];
  };

  const currentData = getCurrentData();
  const filteredData = searchQuery
    ? currentData.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentData;

  // Format year for display
  const formatYear = (year) => {
    const absYear = Math.abs(year);
    if (year < 0) {
      return `${absYear.toLocaleString()} Ma`;
    } else if (year === 0) {
      return "Aujourd'hui";
    } else {
      return `+${absYear.toLocaleString()}`;
    }
  };

  // Calculate duration
  const calculateDuration = (start, end) => {
    const duration = Math.abs(end - start);
    return `${duration.toLocaleString()} Ma`;
  };

  // Get visual icon for item (3 icônes au lieu de 4)
  const getVisualIcon = (item) => {
    const icons = {
      era: {
        Paléozoïque: '🌊🐟🦐',
        Mésozoïque: '🦕🌿🦖',
        Cénozoïque: '🦣🌳🐘',
      },
      period: {
        Cambrien: '🦐🌊🐚',
        Ordovicien: '🐙🌊🦑',
        Silurien: '🐠🌿🦈',
        Dévonien: '🐟🌲🦴',
        Carbonifère: '🌿⚡🔥',
        Permien: '🦎🔥🌋',
        Trias: '🦕🌋⚡',
        Jurassique: '🦕🌿🦴',
        Crétacé: '🦖🌺☄️',
        Paléogène: '🦣🌳🌺',
        Néogène: '🐘🌾🏔️',
        Quaternaire: '🧊👤❄️',
      },
      epoch: '🔍⏳📏',
      stage: '📏🔬⚗️',
    };

    if (item.type === 'era' || item.type === 'period') {
      return icons[item.type][item.name] || '🌍⭐🔥';
    }
    return icons[item.type] || '🌍⭐🔥';
  };

  // Handle navigation
  const handleExplore = (item) => {
    if (item.children && item.children.length > 0) {
      const newBreadcrumb = [...breadcrumb, { name: item.name, level: currentLevel }];
      setBreadcrumb(newBreadcrumb);
      setCurrentParent(item);

      if (currentLevel === 'era') setCurrentLevel('period');
      else if (currentLevel === 'period') setCurrentLevel('epoch');
      else if (currentLevel === 'epoch') setCurrentLevel('stage');

      // Scroll vers le haut du composant
      setTimeout(() => {
        if (timelineRef.current) {
          timelineRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  };

  const handleBack = () => {
    if (breadcrumb.length > 0) {
      const newBreadcrumb = [...breadcrumb];
      const lastItem = newBreadcrumb.pop();
      setBreadcrumb(newBreadcrumb);

      if (newBreadcrumb.length === 0) {
        setCurrentLevel('era');
        setCurrentParent(null);
      } else {
        setCurrentLevel(lastItem.level);
        const parentBreadcrumb = newBreadcrumb[newBreadcrumb.length - 1];
        if (parentBreadcrumb.level === 'era') {
          const era = timelineData.find((e) => e.era === parentBreadcrumb.name);
          setCurrentParent({
            name: era.era,
            children: era.periods,
          });
        }
      }
    }
  };

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      setBreadcrumb([]);
      setCurrentLevel('era');
      setCurrentParent(null);
    } else {
      const newBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(newBreadcrumb);

      if (index === 0) {
        setCurrentLevel('period');
        const era = timelineData.find((e) => e.era === breadcrumb[0].name);
        setCurrentParent({
          name: era.era,
          children: era.periods,
        });
      }
    }
  };

  const handleInfoClick = (item) => {
    setSelectedElement(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedElement(null);
  };

  const getLevelTitle = () => {
    switch (currentLevel) {
      case 'era':
        return 'Ères Géologiques';
      case 'period':
        return 'Périodes';
      case 'epoch':
        return 'Époques';
      case 'stage':
        return 'Étages';
      default:
        return 'Timeline Géologique';
    }
  };

  const getCardClass = (item) => {
    const baseClass = 'timeline-card';
    const typeClass = `${item.type}-card`;
    const specificClass =
      item.type === 'era'
        ? `era-${item.name.toLowerCase().replace(/[^a-z]/g, '')}`
        : item.type === 'period'
          ? `period-${item.name.toLowerCase().replace(/[^a-z]/g, '')}`
          : '';
    const highlightClass =
      searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'highlighted' : '';

    return `${baseClass} ${typeClass} ${specificClass} ${highlightClass}`.trim();
  };

  const getItemStats = (item) => {
    const stats = [];

    if (item.children && item.children.length > 0) {
      const childType = item.type === 'era' ? 'périodes' : item.type === 'period' ? 'époques' : 'étages';
      stats.push({
        icon: '📊',
        label: 'Subdivisions',
        value: `${item.children.length} ${childType}`,
      });
    }

    stats.push({
      icon: '⏱️',
      label: 'Durée',
      value: calculateDuration(item.start, item.end),
    });

    stats.push({
      icon: '📅',
      label: 'Ancienneté',
      value: `${Math.abs(item.start).toLocaleString()} Ma`,
    });

    return stats;
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className="geological-timeline" ref={timelineRef}>
      <div className="timeline-header">
        <h1>Chronologie</h1>

        <div className="breadcrumb">
          <span className="breadcrumb-item" onClick={() => handleBreadcrumbClick(-1)}>
            🏠 Accueil
          </span>
          {breadcrumb.map((item, index) => (
            <span key={index}>
              <span className="breadcrumb-separator"> ⟩ </span>
              <span className="breadcrumb-item" onClick={() => handleBreadcrumbClick(index)}>
                {item.name}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="navigation-controls">
        <div className="controls-row">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={`🔍 Rechercher dans les ${getLevelTitle().toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="view-controls">
            {breadcrumb.length > 0 && (
              <button className="view-button" onClick={handleBack}>
                <FaArrowLeft /> Retour
              </button>
            )}
            <span className="view-button active">
              {getLevelTitle()} ({filteredData.length})
            </span>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        {filteredData.length > 0 ? (
          <div className="timeline-grid">
            {filteredData.map((item, index) => (
              <div key={`${item.type}-${item.name}-${index}`} className={getCardClass(item)}>
                <div className="card-content">
                  <div className="card-visual">
                    <div className="era-visual">{getVisualIcon(item)}</div>
                  </div>

                  <div className="card-header">
                    <h3 className="card-title">{item.name}</h3>
                  </div>

                  <div className="card-dates">
                    <span className="date-range">{formatYear(item.start)}</span>
                    <span className="date-range">à</span>
                    <span className="date-range">{formatYear(item.end)}</span>
                    <div className="duration">{calculateDuration(item.start, item.end)}</div>
                  </div>

                  <div className="card-stats">
                    {getItemStats(item).map((stat, statIndex) => (
                      <div key={statIndex} className="stat-item">
                        <span className="stat-icon">{stat.icon}</span>
                        <span className="stat-value">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-actions">
                    {item.children && item.children.length > 0 && (
                      <button className="explore-button" onClick={() => handleExplore(item)}>
                        Explorer <FaArrowRight />
                      </button>
                    )}

                    <button
                      className="info-button"
                      onClick={() => handleInfoClick(item)}
                      aria-label={`Informations sur ${item.name}`}
                    >
                      <FaInfo />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">Aucun résultat trouvé</h3>
            <p className="empty-state-description">
              Essayez de modifier votre recherche ou explorez d'autres sections de cette fascinante histoire de la
              Terre.
            </p>
          </div>
        )}
      </div>

      {isModalOpen && selectedElement && (
        <ModalTimeline
          isOpen={isModalOpen}
          closeModal={closeModal}
          content={selectedElement.info}
          title={selectedElement.name}
        />
      )}
    </div>
  );
};

Timeline.propTypes = {
  timelineData: PropTypes.arrayOf(
    PropTypes.shape({
      era: PropTypes.string.isRequired,
      eraStart: PropTypes.number,
      eraEnd: PropTypes.number,
      eraInfo: PropTypes.string,
      periods: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          periodStart: PropTypes.number,
          periodEnd: PropTypes.number,
          periodInfo: PropTypes.string,
          epochs: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              epochStart: PropTypes.number,
              epochEnd: PropTypes.number,
              epochInfo: PropTypes.string,
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
