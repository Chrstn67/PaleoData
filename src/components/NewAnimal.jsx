'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/NewAnimal.css';

/* ─── Rotations fixes pour les épingles ─── */
const PIN_ROTATIONS = [-5, 4, -3, 6, -4, 3, -6, 5, -2, 4, -4, 3];

/* ─── Clé localStorage ─── */
const LS_KEY = 'na_revealed_animals';

const loadRevealedFromStorage = (animals) => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const names = JSON.parse(raw); // tableau de noms d'animaux
    // Reconvertir en indices selon la liste courante
    return animals.map((a, i) => (names.includes(a.nom) ? i : null)).filter((i) => i !== null);
  } catch {
    return [];
  }
};

const saveRevealedToStorage = (animals, revealedIndices) => {
  try {
    const names = revealedIndices.map((i) => animals[i]?.nom).filter(Boolean);
    localStorage.setItem(LS_KEY, JSON.stringify(names));
  } catch {
    // silencieux
  }
};

const NewAnimal = ({ animals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revealed, setRevealed] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [justRevealed, setJustRevealed] = useState(null); // index fraîchement gratté

  /* ─── Filtrer les animaux ajoutés cette semaine ─── */
  const newAnimals = animals
    .filter((animal) => {
      const added = new Date(animal.date_ajout);
      const now = new Date();
      return now - added <= 7 * 24 * 60 * 60 * 1000;
    })
    .sort((a, b) => a.nom.localeCompare(b.nom));

  if (newAnimals.length === 0) return null;

  /* ─── Charger les révélés depuis localStorage au montage ─── */
  useEffect(() => {
    const saved = loadRevealedFromStorage(newAnimals);
    if (saved.length > 0) setRevealed(saved);
  }, []);

  /* ─── Ouvrir / Fermer la modale ─── */
  const open = () => {
    setIsModalOpen(true);
    setSelectedPin(null);
    setJustRevealed(null);
    document.body.style.overflow = 'hidden';
  };

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setJustRevealed(null);
      document.body.style.overflow = 'unset';
    }, 320);
  }, []);

  /* ─── Échap pour fermer ─── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen, close]);

  /* ─── Scratch : révéler un animal ─── */
  const scratchPin = (animalIdx) => {
    setSelectedPin(animalIdx);

    if (!revealed.includes(animalIdx)) {
      const newRevealed = [...revealed, animalIdx];
      setRevealed(newRevealed);
      setJustRevealed(animalIdx);
      saveRevealedToStorage(newAnimals, newRevealed);
    } else {
      setJustRevealed(animalIdx);
    }
  };

  const allRevealed = revealed.length === newAnimals.length;
  const revealedCount = revealed.length;

  return (
    <>
      {/* ─── Bouton notification ─── */}
      <aside
        className="na-notif"
        onClick={open}
        role="button"
        tabIndex={0}
        aria-label={newAnimals.length === 1 ? '1 nouvel animal !' : `${newAnimals.length} nouveaux animaux !`}
        onKeyDown={(e) => e.key === 'Enter' && open()}
      >
        <div className="na-notif__icon">
          <span aria-hidden="true">🦕</span>
          <span className="na-notif__badge" aria-hidden="true">
            {newAnimals.length}
          </span>
          <span className="na-notif__ring" aria-hidden="true" />
        </div>
        <span className="na-notif__tooltip">
          {newAnimals.length === 1 ? '1 nouvel animal !' : `${newAnimals.length} nouveaux animaux !`}
        </span>
      </aside>

      {/* ─── Modale ─── */}
      {isModalOpen && (
        <div
          className={`na-overlay${isClosing ? ' na-overlay--closing' : ''}`}
          onClick={(e) => e.target === e.currentTarget && close()}
          role="dialog"
          aria-modal="true"
          aria-label="Nouveaux animaux"
        >
          <div className={`na-modal${isClosing ? ' na-modal--closing' : ''}`}>
            {/* ── Header ── */}
            <header className="na-header">
              <span className="na-header__emoji" aria-hidden="true">
                🎉
              </span>
              <div className="na-header__text">
                <h2 className="na-header__title">Nouveaux animaux</h2>
                <p className="na-header__sub">
                  {newAnimals.length === 1
                    ? '1 spécimen ajouté cette semaine'
                    : `${newAnimals.length} spécimens ajoutés cette semaine`}
                </p>
              </div>
              <button className="na-header__close" onClick={close} type="button" aria-label="Fermer">
                ✕
              </button>
            </header>

            {/* ── Bandeau hint ── */}
            <div className="na-hint-bar" aria-live="polite">
              {allRevealed
                ? `✨ TOUS LES ${newAnimals.length} ANIMAUX RÉVÉLÉS !`
                : revealedCount === 0
                  ? "GRATTE UN FOSSILE POUR RÉVÉLER L'ANIMAL"
                  : `${revealedCount} / ${newAnimals.length} FOSSILES GRATTÉS — CONTINUE !`}
            </div>

            {/* ── Corps scrollable ── */}
            <div className="na-body">
              <div className="na-board" role="list" aria-label="Animaux à découvrir">
                {newAnimals.map((animal, i) => {
                  const rot = PIN_ROTATIONS[i % PIN_ROTATIONS.length];
                  const isRevealed = revealed.includes(i);
                  const isSelected = selectedPin === i;
                  const isNew = justRevealed === i;

                  return (
                    <div
                      key={animal.nom}
                      className={`na-pin${isSelected ? ' na-pin--selected' : ''}${isNew ? ' na-pin--just-revealed' : ''}`}
                      style={{ '--rot': `${rot}deg`, '--delay': `${i * 0.07}s` }}
                      onClick={() => scratchPin(i)}
                      role="listitem"
                      tabIndex={0}
                      aria-label={isRevealed ? animal.nom : 'Fossile non révélé'}
                      onKeyDown={(e) => e.key === 'Enter' && scratchPin(i)}
                    >
                      <div className="na-pin__head" aria-hidden="true" />
                      <div className="na-pin__card">
                        {/* Face boue */}
                        <div
                          className={`na-pin__mud${isRevealed ? ' na-pin__mud--hide' : ''}`}
                          aria-hidden={isRevealed}
                        >
                          <div className="na-pin__mud-block">
                            <div className="na-pin__crack na-pin__crack--1" />
                            <div className="na-pin__crack na-pin__crack--2" />
                            <div className="na-pin__crack na-pin__crack--3" />
                          </div>
                          <span className="na-pin__mud-label">Gratter</span>
                        </div>

                        {/* Face animal + lien */}
                        <div
                          className={`na-pin__animal${isRevealed ? ' na-pin__animal--show' : ''}`}
                          aria-hidden={!isRevealed}
                        >
                          <span className="na-pin__emoji" aria-hidden="true">
                            {animal.image_url ? (
                              <img
                                src={animal.image_url}
                                alt=""
                                className="na-pin__img"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              '🦕'
                            )}
                          </span>
                          <span className="na-pin__name">{animal.nom}</span>
                          <span className="na-pin__new" aria-label="Nouveau">
                            NOUVEAU
                          </span>
                          {isRevealed && (
                            <Link
                              to={`/animal/${encodeURIComponent(animal.nom)}`}
                              className="na-pin__link"
                              onClick={close}
                              aria-label={`Découvrir ${animal.nom}`}
                            >
                              <span>🔍</span>
                              <span>Découvrir</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Footer progress ── */}
            <footer className="na-footer">
              <div className="na-footer__bar">
                <div className="na-footer__fill" style={{ width: `${(revealedCount / newAnimals.length) * 100}%` }} />
              </div>
              <span className="na-footer__label">
                {revealedCount === 0
                  ? 'Aucun fossile gratté'
                  : allRevealed
                    ? 'Tous les fossiles découverts 🎉'
                    : `${revealedCount} sur ${newAnimals.length} révélé${revealedCount > 1 ? 's' : ''}`}
              </span>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

NewAnimal.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      regime_alimentaire: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      geologie: PropTypes.shape({
        ere: PropTypes.string,
        periode: PropTypes.string,
        epoque: PropTypes.string,
        stage: PropTypes.string,
      }),
      date_ajout: PropTypes.string,
    }),
  ).isRequired,
};

export default NewAnimal;
