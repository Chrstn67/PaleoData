'use client';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaInfo, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ModalTimeline from './ModalTimeline';
import '../styles/Timeline.css';

const Timeline = ({ timelineData }) => {
  const [currentLevel, setCurrentLevel] = useState('era');
  const [currentParent, setCurrentParent] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timelineRef = useRef(null);

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [globalSearchResults, setGlobalSearchResults] = useState([]);

  // Fonction pour extraire les nombres d'une chaîne de recherche
  const extractNumbers = (query) => {
    const numbers = query.match(/\d+/g);
    return numbers ? numbers.map((num) => Number.parseInt(num, 10)) : [];
  };

  // Fonction pour vérifier si une année correspond à la recherche
  const matchesYear = (start, end, searchNumbers) => {
    if (searchNumbers.length === 0) return false;

    for (const searchNum of searchNumbers) {
      // Vérifier si le nombre recherché est dans la plage [start, end]
      const absStart = Math.abs(start);
      const absEnd = Math.abs(end);
      const minYear = Math.min(absStart, absEnd);
      const maxYear = Math.max(absStart, absEnd);

      if (searchNum >= minYear && searchNum <= maxYear) {
        return true;
      }

      // Vérifier aussi les valeurs exactes
      if (searchNum === absStart || searchNum === absEnd) {
        return true;
      }
    }
    return false;
  };

  // Fonction pour rechercher dans toute la timeline (améliorée avec années)
  const searchGlobally = (query) => {
    if (!query.trim()) return [];

    const results = [];
    const searchTerm = query.toLowerCase();
    const searchNumbers = extractNumbers(query);
    const hasNumbers = searchNumbers.length > 0;

    // Parcourir toutes les ères
    timelineData.forEach((era) => {
      let matchFound = false;
      let matchType = '';

      // Vérifier le nom de l'ère
      if (era.era.toLowerCase().includes(searchTerm)) {
        matchFound = true;
        matchType = 'name';
      }

      // Vérifier la description de l'ère
      if (!matchFound && era.eraInfo && era.eraInfo.toLowerCase().includes(searchTerm)) {
        matchFound = true;
        matchType = 'description';
      }

      // Vérifier les années de l'ère
      if (!matchFound && hasNumbers && matchesYear(era.eraStart, era.eraEnd, searchNumbers)) {
        matchFound = true;
        matchType = 'year';
      }

      if (matchFound) {
        results.push({
          ...era,
          type: 'era',
          name: era.era,
          start: era.eraStart,
          end: era.eraEnd,
          info: era.eraInfo,
          children: era.periods,
          matchType,
          breadcrumbPath: [],
        });
      }

      // Parcourir les périodes
      era.periods.forEach((period) => {
        let periodMatchFound = false;
        let periodMatchType = '';

        if (period.name.toLowerCase().includes(searchTerm)) {
          periodMatchFound = true;
          periodMatchType = 'name';
        }

        if (!periodMatchFound && period.periodInfo && period.periodInfo.toLowerCase().includes(searchTerm)) {
          periodMatchFound = true;
          periodMatchType = 'description';
        }

        if (!periodMatchFound && hasNumbers && matchesYear(period.periodStart, period.periodEnd, searchNumbers)) {
          periodMatchFound = true;
          periodMatchType = 'year';
        }

        if (periodMatchFound) {
          results.push({
            ...period,
            type: 'period',
            start: period.periodStart,
            end: period.periodEnd,
            info: period.periodInfo,
            children: period.epochs,
            matchType: periodMatchType,
            breadcrumbPath: [era.era],
          });
        }

        // Parcourir les époques
        if (period.epochs) {
          period.epochs.forEach((epoch) => {
            let epochMatchFound = false;
            let epochMatchType = '';

            if (epoch.name.toLowerCase().includes(searchTerm)) {
              epochMatchFound = true;
              epochMatchType = 'name';
            }

            if (!epochMatchFound && epoch.epochInfo && epoch.epochInfo.toLowerCase().includes(searchTerm)) {
              epochMatchFound = true;
              epochMatchType = 'description';
            }

            if (!epochMatchFound && hasNumbers && matchesYear(epoch.epochStart, epoch.epochEnd, searchNumbers)) {
              epochMatchFound = true;
              epochMatchType = 'year';
            }

            if (epochMatchFound) {
              results.push({
                ...epoch,
                type: 'epoch',
                start: epoch.epochStart,
                end: epoch.epochEnd,
                info: epoch.epochInfo,
                children: epoch.stage || [],
                matchType: epochMatchType,
                breadcrumbPath: [era.era, period.name],
              });
            }

            // Parcourir les étages
            if (epoch.stage) {
              epoch.stage.forEach((stage) => {
                let stageMatchFound = false;
                let stageMatchType = '';

                if (stage.name.toLowerCase().includes(searchTerm)) {
                  stageMatchFound = true;
                  stageMatchType = 'name';
                }

                if (!stageMatchFound && stage.stageInfo && stage.stageInfo.toLowerCase().includes(searchTerm)) {
                  stageMatchFound = true;
                  stageMatchType = 'description';
                }

                if (!stageMatchFound && hasNumbers && matchesYear(stage.stageStart, stage.stageEnd, searchNumbers)) {
                  stageMatchFound = true;
                  stageMatchType = 'year';
                }

                if (stageMatchFound) {
                  results.push({
                    ...stage,
                    type: 'stage',
                    start: stage.stageStart,
                    end: stage.stageEnd,
                    info: stage.stageInfo,
                    children: [],
                    matchType: stageMatchType,
                    breadcrumbPath: [era.era, period.name, epoch.name],
                  });
                }
              });
            }
          });
        }
      });
    });

    return results;
  };

  // Get current data based on level and parent
  const getCurrentData = () => {
    // Si on a une recherche, retourner les résultats globaux
    if (searchQuery.trim()) {
      return globalSearchResults;
    }

    if (currentLevel === 'era') {
      return timelineData.map((era) => ({
        ...era,
        type: 'era',
        name: era.era,
        start: era.eraStart,
        end: era.eraEnd,
        info: era.eraInfo,
        children: era.periods,
        breadcrumbPath: [],
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
            breadcrumbPath: [era.era],
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
        breadcrumbPath: currentParent.breadcrumbPath ? [...currentParent.breadcrumbPath, currentParent.name] : [],
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
        breadcrumbPath: currentParent.breadcrumbPath ? [...currentParent.breadcrumbPath, currentParent.name] : [],
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
      // Retour à l'accueil (ères)
      setBreadcrumb([]);
      setCurrentLevel('era');
      setCurrentParent(null);
    } else {
      // Navigation vers un niveau spécifique
      const newBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(newBreadcrumb);

      if (index === 0) {
        // Clic sur la première ère -> afficher les périodes de cette ère
        setCurrentLevel('period');
        const era = timelineData.find((e) => e.era === breadcrumb[0].name);
        setCurrentParent({
          name: era.era,
          children: era.periods,
          breadcrumbPath: [],
        });
      } else if (index === 1) {
        // Clic sur une période -> afficher les époques de cette période
        setCurrentLevel('epoch');
        const era = timelineData.find((e) => e.era === breadcrumb[0].name);
        const period = era.periods.find((p) => p.name === breadcrumb[1].name);
        setCurrentParent({
          name: period.name,
          children: period.epochs || [],
          breadcrumbPath: [era.era],
        });
      } else if (index === 2) {
        // Clic sur une époque -> afficher les étages de cette époque
        setCurrentLevel('stage');
        const era = timelineData.find((e) => e.era === breadcrumb[0].name);
        const period = era.periods.find((p) => p.name === breadcrumb[1].name);
        const epoch = period.epochs.find((e) => e.name === breadcrumb[2].name);
        setCurrentParent({
          name: epoch.name,
          children: epoch.stage || [],
          breadcrumbPath: [era.era, period.name],
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
    if (searchQuery.trim()) {
      return `Résultats de recherche`;
    }

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

  // Gérer les changements de recherche (amélioré)
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const results = searchGlobally(query);
      setGlobalSearchResults(results);

      // Créer des suggestions améliorées (limiter à 5)
      const suggestions = results.slice(0, 5).map((item) => ({
        name: item.name,
        type: item.type,
        matchType: item.matchType,
        breadcrumbPath: item.breadcrumbPath,
        start: item.start,
        end: item.end,
      }));
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setGlobalSearchResults([]);
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Sélectionner une suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    const results = searchGlobally(suggestion.name);
    setGlobalSearchResults(results);
  };

  // Fermer les suggestions
  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
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
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder={`🔍 Rechercher par nom, description ou année (ex: "150", "Jurassique", "Crétacé 100")...`}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={handleSearchBlur}
              />
              {searchQuery && (
                <button
                  className="clear-search-button"
                  onClick={() => {
                    setSearchQuery('');
                    setGlobalSearchResults([]);
                    setSearchSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  type="button"
                  aria-label="Effacer la recherche"
                >
                  ✕
                </button>
              )}
            </div>

            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="search-suggestions">
                {searchSuggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                    <div className="suggestion-main">
                      <span className="suggestion-name">{suggestion.name}</span>
                      <span className={`suggestion-type type-${suggestion.type}`}>
                        {suggestion.type === 'era'
                          ? 'Ère'
                          : suggestion.type === 'period'
                            ? 'Période'
                            : suggestion.type === 'epoch'
                              ? 'Époque'
                              : 'Étage'}
                      </span>
                    </div>
                    {suggestion.breadcrumbPath.length > 0 && (
                      <div className="suggestion-path">{suggestion.breadcrumbPath.join(' › ')}</div>
                    )}
                    <div className="suggestion-match">
                      {suggestion.matchType === 'name' && '📝 Nom'}
                      {suggestion.matchType === 'description' && '📄 Description'}
                      {suggestion.matchType === 'year' &&
                        `📅 Période: ${formatYear(suggestion.start)} - ${formatYear(suggestion.end)}`}
                    </div>
                  </div>
                ))}
                {globalSearchResults.length > 5 && (
                  <div className="suggestion-more">+{globalSearchResults.length - 5} autres résultats...</div>
                )}
              </div>
            )}
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
                    {item.breadcrumbPath && item.breadcrumbPath.length > 0 && (
                      <div className="card-breadcrumb">{item.breadcrumbPath.join(' › ')}</div>
                    )}
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
            <div className="search-tips">
              <h4>💡 Conseils de recherche :</h4>
              <ul>
                <li>
                  <strong>Par nom :</strong> "Jurassique", "Crétacé", "Paléozoïque"
                </li>
                <li>
                  <strong>Par année :</strong> "150", "65", "250"
                </li>
                <li>
                  <strong>Combiné :</strong> "Jurassique 150", "Crétacé extinction"
                </li>
              </ul>
            </div>
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
