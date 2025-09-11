import { HashRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import AnimalList from './AnimalList';
import AnimalCard from './AnimalCard';
import Timeline from './Timeline';
import timelineData from '../data/timelineData';
import EtymoPage from './EtymoPage';
import Documentation from './Documentation/Documentation';
import MentionsLegales from './MentionsLegales';
import Batailles from './Documentation/Batailles/Batailles';
import DecouvertesRecentes from './Documentation/DecouvertesRecentes/DecouvertesRecentes';
import Definitions from './Documentation/Definitions/Definitions';
import Fiction from './Documentation/Fiction/Fiction';
import FossilesCelebres from './Documentation/FossilesCelebres/FossilesCelebres';
import Gisements from './Documentation/Gisements/Gisements';
import Paleontologues from './Documentation/Paleontologues/Paleontologues';
import Questions from './Documentation/Questions/Questions';
import ScrollToTopButton from './ScrollToTopButton';
import NotificationPermissionModal from './NotificationPermissionModal';
import NotificationService from '../services/NotificationService';
import NotificationSettings from './NotificationSettings';
import data from '../data/data';
import NotFound from './NotFound';
import '../styles/App.css';

function App() {
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    // Vérifier si on doit demander la permission au chargement de l'app
    const checkNotificationPermission = () => {
      if (NotificationService.shouldAskPermission()) {
        // Attendre un peu avant d'afficher la modal pour une meilleure UX
        setTimeout(() => {
          setShowPermissionModal(true);
        }, 2000);
      } else {
        // Si les notifications sont déjà activées, vérifier les nouveaux animaux
        if (NotificationService.areNotificationsEnabled()) {
          setTimeout(() => {
            NotificationService.checkAndNotifyNewAnimals(data);
          }, 1000);
        }
      }

      // Nettoyer les anciennes données
      NotificationService.cleanup();
    };

    checkNotificationPermission();
  }, []);

  const handlePermissionAccept = async () => {
    setShowPermissionModal(false);
    const success = await NotificationService.enableNotifications();

    if (success) {
      // Vérifier immédiatement s'il y a de nouveaux animaux à notifier
      setTimeout(() => {
        NotificationService.checkAndNotifyNewAnimals(data);
      }, 1000);
    }
  };

  const handlePermissionDecline = () => {
    setShowPermissionModal(false);
    // La logique de "ne pas redemander avant 30 jours" est gérée dans le service
  };

  return (
    <div className="App">
      <HashRouter>
        <div>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage animals={data} />} />
            <Route path="/parametres-notifications" element={<NotificationSettings />} />
            <Route path="/animaux" element={<AnimalList data={data} />} />
            <Route path="/animal/:nom" element={<AnimalCard data={data} />} />
            <Route path="/echelle-des-temps-geologiques" element={<Timeline timelineData={timelineData} />} />
            <Route path="/liste-etymologique" element={<EtymoPage />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/documentation/batailles" element={<Batailles />} />
            <Route path="/documentation/decouvertes-recentes" element={<DecouvertesRecentes />} />
            <Route path="/documentation/definitions" element={<Definitions />} />
            <Route path="/documentation/fiction" element={<Fiction />} />
            <Route path="/documentation/fossiles-celebres" element={<FossilesCelebres />} />
            <Route path="/documentation/gisements-fossiliferes" element={<Gisements />} />
            <Route path="/documentation/paleontologues" element={<Paleontologues />} />
            <Route path="/documentation/questions" element={<Questions />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </HashRouter>
      <ScrollToTopButton />

      {/* Modal de demande de permission pour les notifications */}
      <NotificationPermissionModal
        isOpen={showPermissionModal}
        onAccept={handlePermissionAccept}
        onDecline={handlePermissionDecline}
      />
    </div>
  );
}

export default App;
