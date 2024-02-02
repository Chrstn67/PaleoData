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
import documentationData from '../Documentation/documentationData';
import MentionsLegales from '../Footer/MentionsLegales/MentionsLegales';
import BackButton from '../BackButton/BackButton';
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
          <BackButton />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animaux" element={<AnimalList data={data} />} />
            <Route path="/animal/:nom" element={<AnimalCard data={data} />} />
            <Route path="/frise-chronologique" element={<Timeline timelineData={timelineData} />} />

            <Route path="/liste-etymologique" element={<EtymoPage />} />
            <Route path="/documentation" element={<Documentation documentationData={documentationData} />} />
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
