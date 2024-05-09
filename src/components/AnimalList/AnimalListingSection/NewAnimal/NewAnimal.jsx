import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NewAnimal.scss';

const NewAnimal = ({ animals }) => {
  const newAnimals = animals.filter((animal) => {
    const dateAjoutee = new Date(animal.date_ajout);
    const dateActuelle = new Date();
    const uneSemaine = 4 * 24 * 60 * 60 * 1000; // 4 jours en millisecondes

    return dateActuelle - dateAjoutee <= uneSemaine;
  });

  if (newAnimals.length === 0) {
    return <p>De nouveaux animaux seront bientôt mis en ligne</p>;
  }

  // Demander la permission de l'utilisateur pour afficher les notifications
  function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          showNotification();
        }
      });
    }
  }

  // Afficher la notification
  function showNotification() {
    const newAnimalsNames = newAnimals.map((animal) => animal.nom);
    const notificationContent = newAnimalsNames.join(', ');
    const notificationUrl = `https://chrstn67.github.io/PaleoData/#/animal/${encodeURIComponent(notificationContent)}`;

    // Vérifier si une notification a déjà été affichée pour ces animaux
    const notificationShown = localStorage.getItem('notificationShown');
    if (notificationShown) {
      const shownAnimals = JSON.parse(notificationShown);
      const newNotificationAnimals = newAnimalsNames.filter((name) => !shownAnimals.includes(name));
      if (newNotificationAnimals.length === 0) {
        return;
      }
      // Mettre à jour le drapeau pour les nouveaux animaux
      localStorage.setItem('notificationShown', JSON.stringify([...shownAnimals, ...newNotificationAnimals]));
    } else {
      // Définir le drapeau pour les nouveaux animaux
      localStorage.setItem('notificationShown', JSON.stringify(newAnimalsNames));
    }

    const notification = new Notification('Nouveaux animaux ajoutés', {
      body: notificationContent,
      icon: 'path/to/icon.png', // Chemin vers l'icône de la notification
      data: { url: notificationUrl },
    });

    // Supprimer la notification une fois qu'elle est fermée
    notification.onclose = (event) => {
      event.preventDefault(); // empêcher le comportement par défaut
      notification.close(); // fermer la notification
    };

    // Rediriger vers l'URL lorsque l'utilisateur clique sur la notification
    notification.onclick = (event) => {
      event.preventDefault(); // empêcher le comportement par défaut
      window.open(notification.data.url, '_blank'); // ouvrir l'URL dans un nouvel onglet
    };
  }

  // Vérifier si de nouveaux animaux ont été ajoutés et afficher une notification si nécessaire
  if (newAnimals.length > 0 && Notification.permission === 'granted') {
    showNotification();
  } else if (newAnimals.length > 0 && Notification.permission !== 'denied') {
    requestPermission();
  }

  return (
    <section className="new-animal">
      <h3>Nouveaux animaux</h3>
      <ul>
        {newAnimals.map((animal) => (
          <li key={animal.nom}>
            <Link to={`/animal/${encodeURIComponent(animal.nom)}`}>
              <img src={animal.image_url} alt={animal.nom} />
              <h3>{animal.nom}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

NewAnimal.propTypes = {
  animals: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      date_ajout: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default NewAnimal;
