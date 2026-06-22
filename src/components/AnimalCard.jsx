'use client';

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiShareAlt, BiX, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import GeoInfo from './GeoInfo';
import Taxonomie from './Taxonomie';
import AnimalHabitat from './AnimalHabitat';
import '../styles/AnimalCard.css';

const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'ogv', 'avi', 'mov', 'mkv'];
const ANIMATED_EXTENSIONS = ['gif', 'webp'];

const getMediaType = (src) => {
  if (!src) return 'image';
  const ext = src.split('.').pop().toLowerCase().split('?')[0];
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
  if (ANIMATED_EXTENSIONS.includes(ext)) return 'animated';
  return 'image';
};

const getVideoMime = (src) => {
  const ext = src.split('.').pop().toLowerCase().split('?')[0];
  const map = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    ogv: 'video/ogg',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
  };
  return map[ext] || 'video/mp4';
};

const MediaItem = ({ src, alt, className, onClick, loading = 'lazy', modalMode = false }) => {
  const type = getMediaType(src);

  if (type === 'video') {
    return (
      <video
        className={className}
        onClick={onClick}
        autoPlay
        loop
        muted
        playsInline
        controls={modalMode}
        title={alt}
        preload="auto"
      >
        <source src={src} type={getVideoMime(src)} />
        <p>Votre navigateur ne supporte pas ce format vidéo.</p>
      </video>
    );
  }

  return <img src={src} alt={alt} className={className} onClick={onClick} loading={loading} />;
};

MediaItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.string,
  modalMode: PropTypes.bool,
};

const MediaBadge = ({ src }) => {
  const type = getMediaType(src);
  if (type === 'video') return <span className="media-badge media-badge--video">▶ Vidéo</span>;
  if (type === 'animated') return <span className="media-badge media-badge--animated">✦ Animé</span>;
  return null;
};

MediaBadge.propTypes = { src: PropTypes.string.isRequired };

// ─────────────────────────────────────────────────────────────────────────────

const AnimalCard = ({ data }) => {
  const [modalState, setModalState] = useState({ open: false, type: null, index: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fermer la modale avec la touche Escape
  useEffect(() => {
    if (!modalState.open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalState.open, modalState.index]);

  const { nom } = useParams();

  PropTypes.checkPropTypes({ data: PropTypes.array.isRequired }, { data }, 'prop', 'AnimalCard');

  const animal = data.find((a) => a.nom === decodeURIComponent(nom));

  if (!animal) {
    return <div>Animal non trouvé</div>;
  }

  const photos = Array.isArray(animal.image_url) ? animal.image_url : animal.image_url ? [animal.image_url] : [];
  const fossiles = Array.isArray(animal.image_fossile)
    ? animal.image_fossile
    : animal.image_fossile
      ? [animal.image_fossile]
      : [];

  const openModal = (type, index = 0) => {
    setModalState({ open: true, type, index });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalState({ open: false, type: null, index: 0 });
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const navigateModal = (direction) => {
    const list = modalState.type === 'photo' ? photos : fossiles;
    setModalState((prev) => ({
      ...prev,
      index: (prev.index + direction + list.length) % list.length,
    }));
  };

  const formatDiets = (regimeAlimentaire) => {
    if (!regimeAlimentaire) return 'Informations à venir...';
    if (Array.isArray(regimeAlimentaire)) return regimeAlimentaire.join(', ');
    if (typeof regimeAlimentaire === 'string') {
      const cleaned = regimeAlimentaire.replace(/[\[\]]/g, '').trim();
      if (cleaned.includes(','))
        return cleaned
          .split(',')
          .map((d) => d.trim())
          .join(', ');
      return cleaned;
    }
    return 'Informations à venir...';
  };

  const shareLink = async (animal) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Découvre des informations sur ${animal.nom}.`,
          text: `Découvre des informations sur ${animal.nom}.`,
          url: `${window.location.origin}/PaleoData/#/animal/${encodeURIComponent(animal.nom)}`,
        });
      } catch (error) {
        console.error('Erreur lors du partage :', error);
      }
    }
  };

  const sortedData = [...data].sort((a, b) => a.nom.localeCompare(b.nom));
  const currentAnimalIndex = sortedData.findIndex((a) => a.nom === decodeURIComponent(nom));
  const previousAnimal = currentAnimalIndex > 0 ? sortedData[currentAnimalIndex - 1] : null;
  const nextAnimal = currentAnimalIndex < sortedData.length - 1 ? sortedData[currentAnimalIndex + 1] : null;

  const currentModalList = modalState.type === 'photo' ? photos : fossiles;
  const currentModalSrc = currentModalList[modalState.index];
  const currentModalIsVideo = getMediaType(currentModalSrc) === 'video';

  return (
    <main className="animal-card">
      <header className="hero-section">
        <div className="hero-content-wrapper">
          <section className="title-image-section">
            <h2 className="animal-name">{animal.nom}</h2>

            {photos.length > 0 && (
              <div className={`hero-media-grid hero-media-grid--${Math.min(photos.length, 3)}`}>
                {photos.map((src, i) => (
                  <div
                    key={i}
                    className="image-wrapper"
                    onClick={() => openModal('photo', i)}
                    title="Cliquer pour agrandir"
                  >
                    <MediaItem
                      src={src}
                      alt={`${animal.nom} - media ${i + 1}`}
                      className="hero-image"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <MediaBadge src={src} />
                    <div className="image-overlay">
                      <span className="zoom-hint">🔍 Agrandir</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <button aria-label="Partager" type="button" className="share-btn" onClick={() => shareLink(animal)}>
            <BiShareAlt size={20} />
          </button>
        </div>
      </header>

      {/* ── Modal média agrandi ── */}
      {modalState.open && (
        <div
          className="image-modal-overlay"
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
          aria-label={`${animal.nom} — vue agrandie`}
        >
          {/* Bouton fermer */}
          <button className="image-modal-close" onClick={closeModal} aria-label="Fermer">
            <BiX size={28} />
          </button>

          <div className={`image-modal-content${currentModalIsVideo ? ' image-modal-content--video' : ''}`}>
            {/* Zone du média avec boutons nav à l'intérieur */}
            <div className="image-modal-media-wrapper" onClick={handleModalClick}>
              {currentModalList.length > 1 && (
                <button
                  className="modal-nav-btn modal-nav-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateModal(-1);
                  }}
                  aria-label="Précédent"
                >
                  <BiChevronLeft size={28} />
                </button>
              )}

              <MediaItem
                src={currentModalSrc}
                alt={`${animal.nom} — ${modalState.type === 'fossile' ? 'fossile' : 'media'} ${modalState.index + 1}`}
                className="image-modal-img"
                modalMode
              />

              {currentModalList.length > 1 && (
                <button
                  className="modal-nav-btn modal-nav-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateModal(1);
                  }}
                  aria-label="Suivant"
                >
                  <BiChevronRight size={28} />
                </button>
              )}
            </div>

            {/* Caption */}
            <div className="image-modal-caption">
              <h3>{animal.nom}</h3>
              {modalState.type === 'fossile' && <p className="modal-label-fossile">🦴 Fossile</p>}
              {modalState.type === 'photo' && animal.etymologie && <p>{animal.etymologie}</p>}
              {currentModalList.length > 1 && (
                <p className="modal-counter">
                  {modalState.index + 1} / {currentModalList.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="main-container">
        <section className="etymology-content">
          <h3 className="etymology-title">Étymologie</h3>
          <p className="etymology-text">
            {animal.etymologie || 'Les origines du nom de cette créature fascinante restent à découvrir...'}
          </p>
        </section>

        <section className="content-section">
          <section className="content-card description-card">
            <h3>Description</h3>
            <div className="description-content">
              {animal.description ? (
                <div dangerouslySetInnerHTML={{ __html: animal.description }} />
              ) : (
                <p>Description détaillée à venir...</p>
              )}
            </div>
          </section>

          <section className="info-grid">
            <section className="content-card">
              <h3>Régime alimentaire</h3>
              <p>{formatDiets(animal.regime_alimentaire)}</p>
            </section>

            <section className="content-card">
              <h3>Morphologie</h3>
              {animal.autres_infos && animal.autres_infos.taille ? (
                <>
                  {animal.autres_infos.taille.longueur && <p>{animal.autres_infos.taille.longueur} de long</p>}
                  {animal.autres_infos.taille.hauteur && <p>{animal.autres_infos.taille.hauteur} de haut</p>}
                  {animal.autres_infos.taille.envergure && <p>{animal.autres_infos.taille.envergure} d'envergure</p>}
                  {animal.autres_infos.poids && <p>{animal.autres_infos.poids}</p>}
                </>
              ) : (
                <p>Informations morphologiques à venir...</p>
              )}
            </section>

            <section className="content-card">
              <h3>Découverte</h3>
              {animal.decouverte ? (
                <>
                  {animal.decouverte.date && <p>Date : {animal.decouverte.date}</p>}
                  {animal.decouverte.lieu && <p>Lieu : {animal.decouverte.lieu}</p>}
                </>
              ) : (
                <p>Informations sur la découverte à venir...</p>
              )}
            </section>
          </section>

          {fossiles.length > 0 && (
            <section className="content-card fossile-card">
              <h3>🦴 Fossile{fossiles.length > 1 ? 's' : ''}</h3>
              <div className="fossile-gallery">
                {fossiles.map((src, i) => (
                  <div
                    key={i}
                    className="fossile-thumb-wrapper"
                    onClick={() => openModal('fossile', i)}
                    title="Cliquer pour agrandir"
                  >
                    <MediaItem
                      src={src}
                      alt={`Fossile de ${animal.nom}${fossiles.length > 1 ? ` ${i + 1}` : ''}`}
                      className="fossile-thumb"
                      loading="lazy"
                    />
                    <MediaBadge src={src} />
                    <div className="image-overlay">
                      <span className="zoom-hint">🔍 Agrandir</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <GeoInfo key={animal.nom} geologie={animal.geologie} animalNom={animal.nom} />
        </section>

        <section className="habitat-section-wrapper">
          <AnimalHabitat animal={animal} />
        </section>

        <section className="taxonomy-section-wrapper">
          {Object.entries(animal.taxonomie).length > 0 && <Taxonomie taxonomie={animal.taxonomie} />}
        </section>
      </section>

      <section className="navigation-section">
        <section className="navigation-links">
          {previousAnimal && (
            <Link
              to={`/animal/${encodeURIComponent(previousAnimal.nom)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              ← {previousAnimal.nom}
            </Link>
          )}
          {nextAnimal && (
            <Link
              to={`/animal/${encodeURIComponent(nextAnimal.nom)}`}
              className="navigation-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              {nextAnimal.nom} →
            </Link>
          )}
        </section>
      </section>
    </main>
  );
};

AnimalCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AnimalCard;
