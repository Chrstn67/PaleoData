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
import BataillesList from './Documentation/BataillesList';
import BatailleDetail from './Documentation/BatailleDetail';
import QuestionsList from './Documentation/QuestionsList';
import QuestionDetail from './Documentation/QuestionDetail';
import DefinitionsList from './Documentation/DefinitionsList';
import DefinitionDetail from './Documentation/DefinitionDetail';
import FossilesList from './Documentation/FossilesList';
import FossileDetail from './Documentation/FossileDetail';
import DecouvertesList from './Documentation/DecouvertesList';
import DecouverteDetail from './Documentation/DecouverteDetail';
import PaleontologuesList from './Documentation/PaleontologuesList';
import PaleontologueDetail from './Documentation/PaleontologueDetail';
import FictionsList from './Documentation/FictionsList';
import FictionDetail from './Documentation/FictionDetail';

import Gisements from './Documentation/Gisements/Gisements';

import ScrollToTopButton from './ScrollToTopButton';

import MentionsLegales from './MentionsLegales';

import data from '../data/data';
import NotFound from './NotFound';
import '../styles/App.css';

function App() {
  return (
    <main className="App">
      <HashRouter>
        <section>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage animals={data} />} />
            <Route path="/animaux" element={<AnimalList data={data} />} />
            <Route path="/animal/:nom" element={<AnimalCard data={data} />} />
            <Route path="/echelle-des-temps-geologiques" element={<Timeline timelineData={timelineData} />} />
            <Route path="/liste-etymologique" element={<EtymoPage />} />
            <Route path="/" element={<Documentation />} />
            <Route path="/documentation" element={<Documentation />} />

            <Route path="/documentation/batailles" element={<BataillesList />} />
            <Route path="/documentation/batailles/:slug" element={<BatailleDetail />} />

            <Route path="/documentation/questions" element={<QuestionsList />} />
            <Route path="/documentation/questions/:slug" element={<QuestionDetail />} />

            <Route path="/documentation/definitions" element={<DefinitionsList />} />
            <Route path="/documentation/definitions/:slug" element={<DefinitionDetail />} />

            <Route path="/documentation/fossiles-celebres" element={<FossilesList />} />
            <Route path="/documentation/fossiles-celebres/:slug" element={<FossileDetail />} />

            <Route path="/documentation/decouvertes-recentes" element={<DecouvertesList />} />
            <Route path="/documentation/decouvertes-recentes/:slug" element={<DecouverteDetail />} />

            <Route path="/documentation/paleontologues" element={<PaleontologuesList />} />
            <Route path="/documentation/paleontologues/:slug" element={<PaleontologueDetail />} />

            <Route path="/documentation/fiction" element={<FictionsList />} />
            <Route path="/documentation/fiction/:slug" element={<FictionDetail />} />

            <Route path="/documentation/gisements-fossiliferes" element={<Gisements />} />

            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </section>
      </HashRouter>
      <ScrollToTopButton />
    </main>
  );
}

export default App;
