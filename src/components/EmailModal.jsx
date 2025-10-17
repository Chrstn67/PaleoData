import { useState } from 'react';
import { FaEnvelope, FaTimes, FaCheck, FaCopy, FaPaw, FaBug, FaRocket } from 'react-icons/fa';
import '../styles/EmailModal.css';

const EmailModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState('animal'); // 'animal', 'aventure', 'bug'

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsCopied(false);
    setSelectedOption('animal');
  };

  const getEmailContent = () => {
    const templates = {
      animal: {
        subject: "Proposition d'ajout d'un animal - PaleoData",
        body: `
Bonjour l'équipe PaleoData,

Je souhaite proposer l'ajout d'un animal à votre base de données.

📸 IMAGE :
[Joindre une belle image haute résolution de l'animal ou de fossiles]

---
🦖 NOM DE L'ANIMAL :
Nom :

---
📚 ÉTYMOLOGIE :
Signification du nom :
Origine linguistique (facultatif) :

---
🔬 TAXONOMIE COMPLÈTE :
[Essaie d'être le plus complet possible en ajoutant tous les taxons disponibles pour cet animal]
Règne :
Embranchement :
Classe :
Ordre :
Famille :
Genre :
Espèce :

---
⏳ DONNÉES GÉOLOGIQUES :
[La numération est en Millions d'années]
Apparition : [Ex. -123]
Ère :
Période :
Époque :
Étage :
Extinction : [Ex. -123]

---
📏 DIMENSIONS :
Longueur :
Hauteur :
Envergure : [Si animal volant]
Poids estimé :

---
🔍 DÉCOUVERTE :
Date de découverte :
Lieu de découverte :
Coordonnées GPS :

---
🌍 ZONE GÉOGRAPHIQUE PALÉONTOLOGIQUE :
[Préciser la zone]
Zone géographique :

---
📖 SOURCES ET RÉFÉRENCES :
Publications scientifiques :
Autres informations pertinentes :

Merci à toi !
Cordialement,
[Ton nom]
        `,
      },
      aventure: {
        subject: "Participer à l'aventure PaleoData - PaleoData",
        body: `
Bonjour l'équipe PaleoData,

Je souhaite participer à l'aventure PaleoData et contribuer au projet !

---
🎯 COMMENT SOUHAITEZ-VOUS PARTICIPER ?
[ ] Rejoindre l'équipe de développement
[ ] Contribuer aux recherches paléontologiques
[ ] Aider à la modération des contenus
[ ] Participer aux tests utilisateurs
[ ] Autre : [Précisez]

---
👤 MES COMPÉTENCES :
Compétences principales :
Niveau d'expertise :
Expérience dans le domaine :

---
⏰ DISPONIBILITÉ :
Temps que je peux consacrer :
Préférence de participation :

---
💡 MES IDÉES POUR PALEO DATA :
Suggestions d'amélioration :
Fonctionnalités que j'aimerais développer :

---
📞 COORDONNÉES :
Email :
Discord (si disponible) :

Merci de me recontacter !
Cordialement,
[Ton nom]
        `,
      },
      bug: {
        subject: "Signalement d'erreur/bug - PaleoData",
        body: `
Bonjour l'équipe PaleoData,

Je souhaite signaler une erreur ou un bug sur le site PaleoData.

---
🐛 TYPE DE PROBLÈME :
[ ] Erreur d'information sur un animal
[ ] Bug technique / dysfonctionnement
[ ] Problème d'affichage
[ ] Suggestion de correction
[ ] Autre : [Précisez]

---
📝 DESCRIPTION DU PROBLÈME :
[Décrivez le problème de manière détaillée]

---
🔗 PAGE CONCERNÉE :
URL de la page :
Nom de l'animal (si applicable) :

---
🖥️ ENVIRONNEMENT :
Appareil utilisé : [PC, mobile, tablette]
Navigateur : [Chrome, Firefox, Safari, etc.]
Version du navigateur :

---
📸 CAPTURE D'ÉCRAN :
[Si possible, joindre une capture d'écran du problème]

---
💡 SUGGESTION DE CORRECTION :
[Si vous avez une idée pour résoudre le problème]

---
📞 COORDONNÉES (facultatif) :
Email pour vous recontacter :

Merci pour votre attention !
Cordialement,
[Ton nom]
        `,
      },
    };

    return templates[selectedOption];
  };

  const getModalTitle = () => {
    const titles = {
      animal: 'Proposer un animal',
      aventure: "Rejoindre l'aventure",
      bug: 'Signaler un problème',
    };
    return titles[selectedOption];
  };

  const getModalSubtitle = () => {
    const subtitles = {
      animal: "Avant d'envoyer ton email, assure-toi d'avoir toutes ces informations",
      aventure: 'Rejoins notre équipe et contribue à faire grandir PaleoData !',
      bug: 'Aide-nous à améliorer PaleoData en signalant les problèmes',
    };
    return subtitles[selectedOption];
  };

  const getRequiredInfo = () => {
    const info = {
      animal: (
        <>
          <h3 className="email-section-header">
            <FaCheck className="email-check-icon" />
            Informations obligatoires
          </h3>
          <ul className="email-info-list">
            <li>
              <strong>📸 Image de qualité :</strong> photo haute résolution ou reconstitution 3D
            </li>
            <li>
              <strong>🦖 Nom complet :</strong> Nom scientifique de l'animal
            </li>
            <li>
              <strong>📚 Étymologie :</strong> Signification du nom et origine
            </li>
            <li>
              <strong>🔬 Taxonomie la plus complète possible :</strong> Règne, Embranchement, Classe, Ordre, Famille,
              Genre, Espèce(s), etc...
            </li>
            <li>
              <strong>⏳ Données géologiques :</strong> Ère, Période, Époque, Étage, apparition, extinction
            </li>
            <li>
              <strong>📏 Dimensions :</strong> Longueur, hauteur, envergure, poids
            </li>
            <li>
              <strong>🔍 Découverte :</strong> Date, lieu exact, coordonnées GPS
            </li>
            <li>
              <strong>🌍 Zone géographique :</strong> Zone où vivait l'animal
            </li>
            <li>
              <strong>📖 Sources :</strong> Publications scientifiques et références
            </li>
          </ul>
        </>
      ),
      aventure: (
        <>
          <h3 className="email-section-header">
            <FaCheck className="email-check-icon" />
            Comment participer ?
          </h3>
          <ul className="email-info-list">
            <li>
              <strong>🎯 Développement : </strong>Aide-nous à améliorer le site et ses fonctionnalités
            </li>
            <li>
              <strong>🔬 Recherche : </strong>Contribue à la validation des données paléontologiques
            </li>
            <li>
              <strong>📝 Modération : </strong>Aide à maintenir la qualité des contenus
            </li>
            <li>
              <strong>🐛 Tests : </strong>Signale les bugs et participe aux tests utilisateurs
            </li>
            <li>
              <strong>💡 Idées : </strong>Propose de nouvelles fonctionnalités et améliorations
            </li>
            <li>
              <strong>🌍 Communauté : </strong>Participe aux discussions et aide les autres membres
            </li>
          </ul>
        </>
      ),
      bug: (
        <>
          <h3 className="email-section-header">
            <FaCheck className="email-check-icon" />
            Informations importantes à fournir
          </h3>
          <ul className="email-info-list">
            <li>
              <strong> 🐛 Description claire : </strong>Explique le problème en détail
            </li>
            <li>
              <strong>🔗 Page concernée : </strong>Donne l'URL exacte où se produit le problème
            </li>
            <li>
              <strong>🖥️ Environnement : </strong>Précise ton appareil et navigateur
            </li>
            <li>
              <strong>📸 Capture d'écran : </strong>Si possible, joins une image du problème
            </li>
            <li>
              <strong>⏰ Circonstances : </strong>Quelles actions ont conduit au problème ?
            </li>
            <li>
              <strong>💡 Suggestions : </strong>As-tu une idée pour corriger le problème ?
            </li>
          </ul>
        </>
      ),
    };
    return info[selectedOption];
  };

  const getNote = () => {
    const notes = {
      animal:
        '💡 Astuce : Plus tes informations sont précises et sourcées, plus vite ton animal sera ajouté et plus vite PaleoData avancera !',
      aventure:
        '🚀 Rejoins notre communauté passionnée ! Toutes les compétences sont les bienvenues, que tu sois développeur, paléontologue ou simplement passionné.',
      bug: '🔧 Merci pour ton aide ! Chaque signalement nous aide à améliorer PaleoData pour toute la communauté.',
    };
    return notes[selectedOption];
  };

  const handleSendEmail = () => {
    const content = getEmailContent();

    // Ouvre le client mail
    window.location.href = `mailto:paleodata@outlook.com?subject=${encodeURIComponent(
      content.subject,
    )}&body=${encodeURIComponent(content.body)}`;

    // Copie l'adresse dans le presse-papiers
    navigator.clipboard
      .writeText('paleodata@outlook.com')
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch(() => console.log("Impossible de copier l'adresse email"));

    // Ferme la modale
    closeModal();
  };

  return (
    <>
      {/* Bouton Email dans le footer */}
      <button onClick={openModal} className="social-link email" title="Email" type="button">
        <FaEnvelope className="social-icon" />
        <span>Email</span>
      </button>

      {/* Modale */}
      {isModalOpen && (
        <dialog className="email-modal-overlay" onClick={closeModal}>
          <body className="email-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="email-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>

            <section className="email-modal-header">
              <FaEnvelope className="email-modal-icon" />
              <h2 className="email-modal-title">{getModalTitle()}</h2>
              <p className="email-modal-subtitle">{getModalSubtitle()}</p>
            </section>

            {/* Sélecteur d'options */}
            <section className="email-options-selector">
              <button
                className={`email-option ${selectedOption === 'animal' ? 'active' : ''}`}
                onClick={() => setSelectedOption('animal')}
              >
                <FaPaw />
                <span>Ajouter un animal</span>
              </button>
              <button
                className={`email-option ${selectedOption === 'aventure' ? 'active' : ''}`}
                onClick={() => setSelectedOption('aventure')}
              >
                <FaRocket />
                <span>Participer</span>
              </button>
              <button
                className={`email-option ${selectedOption === 'bug' ? 'active' : ''}`}
                onClick={() => setSelectedOption('bug')}
              >
                <FaBug />
                <span>Signaler un bug</span>
              </button>
            </section>

            <section className="email-modal-body">
              <div className="email-info-section">{getRequiredInfo()}</div>

              <div className="email-info-note">
                <p>{getNote()}</p>
              </div>
            </section>

            <section className="email-modal-footer">
              <button className="email-btn-secondary" onClick={closeModal}>
                Annuler
              </button>
              <button className="email-btn-primary" onClick={handleSendEmail}>
                <FaEnvelope />
                {isCopied ? (
                  <>
                    <FaCopy style={{ marginRight: '8px' }} />
                    Adresse copiée !
                  </>
                ) : (
                  'Écrire mon mail'
                )}
              </button>
            </section>
          </body>
        </dialog>
      )}
    </>
  );
};

export default EmailModal;
