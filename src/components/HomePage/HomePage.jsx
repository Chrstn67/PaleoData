import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/data';
import './HomePage.scss';

const HomePage = () => {
  const getRandomAnimal = (animalData) => {
    const randomIndex = Math.floor(Math.random() * animalData.length);
    return animalData[randomIndex];
  };

  const randomAnimal = getRandomAnimal(data);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    cardRef.current.style.transform = `perspective(500px) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
  };

  const resetCardTransform = () => {
    cardRef.current.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div className="home-page">
      <section className="about-section">
        <h2>À Propos</h2>
        <p>
          PaleoData est votre source ultime d&apos;informations sur la paléontologie, offrant des données sur les
          créatures étonnantes du Paléozoïque jusqu&apos;à nos jours.
        </p>
        <br />
        <p>
          <i>
            Nous nous engageons résolument à observer rigoureusement les dispositions du RGPD en matière de protection
            des données, et nous nous assurons ainsi de n&apos;utiliser votre adresse électronique que dans le cadre des
            échanges liés au sujet principal du site.
          </i>
        </p>

        {randomAnimal && (
          <div className="random-animal-section">
            <ul>
              <li key={randomAnimal.nom} ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={resetCardTransform}>
                <Link to={`/animal/${encodeURIComponent(randomAnimal.nom)}`}>
                  <div
                    style={{
                      background: `center / contain no-repeat url(${randomAnimal.image_url})`,
                      height: '20em',
                      width: '20em',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <h3>{randomAnimal.nom}</h3>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </section>
      <section className="contact-section">
        <h2>Contactez-nous</h2>
        <p>Vous pouvez nous contacter par e-mail pour différentes raisons :</p>
        <ul>
          <li>
            <a href="mailto:paleodata@outlook.com?subject=Erreur%20géologique%20et/ou%20paléontologique&body=Bonjour%2C%0A%0ASur votre site 'PaleoData', j'ai remarqué une erreur dans les informations géologiques ou paléontologiques suivantes%3A%0A%0A[Veuillez fournir les détails de l'erreur ici].%0A%0AVoici mes sources appuyant mes dires%3A%0A%0A[Veuillez fournir les sources ici].%0A%0AJe vous remercie beaucoup pour votre attention et vous adresse mes plus sincères salutations.%0A[Votre nom]%0A%0A">
              Signaler une erreur
            </a>
          </li>
          <li>
            <a href="mailto:paleodata@outlook.com?subject=Animal%20manquant&body=Bonjour%2C%0A%0ASur votre site 'PaleoData', j'ai remarqué qu'un (ou plusieurs) animaux ne figure(nt) pas. Il s'agit de %3A%0A%0A[Veuillez fournir le nom de l'animal (des animaux)].%0A%0AVoici des renseignements sur ce(s) trésor(s) du passé%3A%0A%0A[Veuillez fournir le maximum d'informations ici, en précisant le(s) nom(s), les taxons, le régime alimentaire, l'habitat, les informations géologiques (ère, période, époque, étage, apparition, extinction), la taille (hauteur et longueur), poids, les lieux et dates de découverte, et surtout, une description précise et complète]. %0A%0AJe vous remercie beaucoup pour votre attention et vous adresse mes plus sincères salutations.%0A[Votre nom]%0A%0A">
              Proposer un animal
            </a>
          </li>
          <li>
            <a href="mailto:paleodata@outlook.com?subject=Erreur%20de%20fonctionnalité&body=Bonjour%2C%0A%0ASur votre site 'PaleoData', j'ai remarqué un bug. En faisant %3A%0A%0A[Veuillez fournir les actions effectuées]%2C je ne parviens pas à [Effectuer cette action].%0A%0AJe vous remercie beaucoup pour votre attention et vous adresse mes plus sincères salutations.%0A[Votre nom]%0A%0A">
              Signaler un bug
            </a>
          </li>
          <li>
            <a href="mailto:paleodata@outlook.com?subject=Fonctionnalité%20de%20supplémentaire&body=Bonjour%2C%0A%0ASur votre site 'PaleoData', je souhaiterais beaucoup pouvoir%3A%0A%0A[Expliquez ce que vous souhaitez faire].%3A%0A%0ACela me permettrait de [Définissez l'objectif de la fonctionnalité demandée].%0A%0AJe vous remercie beaucoup pour votre attention et vous adresse mes plus sincères salutations.%0A[Votre nom]%0A%0A">
              Proposer une fonctionnalité
            </a>
          </li>
          <li>
            <a href="mailto:paleodata@outlook.com?subject=Rejoindre%20de%20l'aventure&body=Bonjour%2C%0A%0AJe découvre votre site 'PaleoData'.%0AJe suis intéressé(e) à rejoindre l'aventure.%0A%0AJe suis%3A [Renseignez votre métier ou votre rôle ici]%0A%0AMon expérience en lien avec la paléontologie ou le développement web est%3A [Indiquez votre expérience ici]%0A%0AJ'aimerais contribuer en%3A [Expliquez comment vous aimeriez contribuer]%0A%0AJe vous remercie beaucoup pour votre attention et vous adresse mes plus sincères salutations.%0A[Votre nom]%0A%0A">
              Rejoindre l&apos;aventure
            </a>
          </li>
        </ul>
        <p>
          ATTENTION: <br /> En voulant rejoindre notre équipe, vous devez être conscients que ce projet est{' '}
          <b>complètement bénévole</b>. Il s&apos;agit là d&apos;un loisir dans le simple but de rendre ce site
          attractif et utile tout en s&apos;amusant et en partageant humblement notre savoir.
        </p>
        <p>
          Si vous êtes <b>développeurs</b> et que vous voulez faire partie de l&apos;aventure, sachez que certaines
          fonctionnalités sont en cours de réflexion et n&apos;attendent que vous. Nous prenons en compte toutes les
          suggestions et nous souhaitons intégrer le plus d&apos;améliorations et correctifs possibles.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
