import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Footer from '../Footer/Footer';
import AnimalList from '../AnimalList/AnimalList';
import AnimalCard from '../AnimalCard/AnimalCard';
import Timeline from '../Timeline/Timeline';
import timelineData from '../Timeline/timelineData';
import EtymoPage from '../EtymoPage/EtymoPage';
import Documentation from '../Documentation/Documentation';
import MentionsLegales from '../Footer/MentionsLegales/MentionsLegales';
import Batailles from '../Documentation/Batailles/Batailles';
import DecouvertesRecentes from '../Documentation/DecouvertesRecentes/DecouvertesRecentes';
import Definitions from '../Documentation/Definitions/Definitions';
import FossilesCelebres from '../Documentation/FossilesCelebres/FossilesCelebres';
import Gisements from '../Documentation/Gisements/Gisements';
import Paleontologues from '../Documentation/Paleontologues/Paleontologues';
import Questions from '../Documentation/Questions/Questions';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import data from '../../data/data';
import NotFound from '../NotFound/NotFound';
import './App.scss';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animaux" element={<AnimalList data={data} />} />
            <Route path="/animal/:nom" element={<AnimalCard data={data} />} />
            <Route path="/echelle-des-temps-geologiques" element={<Timeline timelineData={timelineData} />} />
            <Route path="/liste-etymologique" element={<EtymoPage />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/documentation/batailles" element={<Batailles />} />
            <Route path="/documentation/decouvertes-recentes" element={<DecouvertesRecentes />} />
            <Route path="/documentation/definitions" element={<Definitions />} />
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
    </div>
  );
}

export default App;
